var _ = require("underscore"),
	Promise = require("bluebird"),
	path = require("path"),
	fs = Promise.promisifyAll(require("fs")),
	cp = Promise.promisify(require("cp")),
	mkdirp = Promise.promisify(require("mkdirp")),
	ipm = require("./pm"),
	exec = require("child_process").exec,
	util = require("./util"),
	igor = require("ignore"),
	chokidar = require("chokidar"),
	semver = require("semver"),
	asyncWait = require("asyncwait");

module.exports = function(dir, pkgnames, options, cb) {
	dir = path.resolve(dir || ".");
	options = options || {};

	var installDeps = options.deps !== false;
	var moddir = path.resolve(dir, "node_modules");
	var ignore = util.parseIgnoreRules(options.ignore);
	
	// match names to paths
	return ipm.list(dir, pkgnames, options)

	// install each package
	.each(function(pkg) {
		var pkgdir = pkg.__dirname;
		var npkgdir = path.join(moddir, pkg.name);
		var copyQueue = [];
		var flushing = false;
		var installing = false;
		var watchDefer = {};
		var watchr;
		var init = true;
		
		var wait, reject, promise = new Promise(function(resolve, _reject) {
			reject = _reject;
			wait = asyncWait(_.once(resolve));
		}).finally(function() {
			init = false;
		});

		var invalidateQueue = _.debounce(flushQueue, 25);
		var invalidateDeps = _.debounce(installMissingDeps, 500);
		var waitDeps = options.sync && installDeps ? wait(function() {
			waitDeps = null;
		}) : null;

		function flushQueue() {
			if (flushing) return invalidateQueue();
			flushing = true;

			var queue = _.clone(copyQueue);
			copyQueue = [];
			
			Promise.map(queue, function(args) {
				return copyFile(args[0], args[1]);
			}, { concurrency: 10 }).finally(function() {
				flushing = false;
			});
		}

		function installMissingDeps() {
			if (installing) return invalidateDeps();
			installing = true;

			util.getPackage(pkgdir).then(function(npkg) {
				return pkg.dependencies = npkg.dependencies;
			}).then(function(deps) {
				return getModuleVersions(npkgdir, _.keys(deps)).then(function(mods) {
					return Promise.map(_.pairs(mods), function(mod) {
						var name = mod[0], ver = mod[1];
						if (!ver || !semver.satisfies(ver, deps[name])) {
							return util.npm(npkgdir, "install", name);
						}
					}, { concurrency: 1 });
				});
			}).finally(function() {
				installing = false;
				if (waitDeps) waitDeps();
			});
		}

		function onChange(file) {
			var relpath =  path.relative(pkgdir, file);
			if (installDeps && relpath === "package.json") invalidateDeps();
			copyQueue.push([ file, path.resolve(npkgdir, relpath) ]);
			invalidateQueue();
		}
		
		// wait for initial to catch up
		new Promise(function(resolve, reject) {
			watchDefer.resolve = resolve;
			watchDefer.reject = reject;
			watchDefer.ready = _.debounce(watchDefer.resolve, 100);
			watchDefer.ready(); // call once to guarantee it is run
		}).then(wait(), reject).finally(function() {
			watchr.removeListener("add", watchDefer.ready);
		});

		// watch the original folder for changes and mimic them
		watchr = chokidar.watch(pkgdir, {
			persistent: true,
			ignoreInitial: !options.sync,
			ignored: function(file) {
				return !ignore.filter([ path.relative(pkgdir, file) ]).length;
			}
		})
		.on("add", onChange)
		.on("change", onChange)
		.on("unlink", function(file) {
			var lfile = path.resolve(npkgdir, path.relative(pkgdir, file));
			return fs.unlinkAsync(lfile).catch(function(e) {
				if (util.isFileError(e, "ENOENT")) return;
				throw e;
			});
		})
		.on("error", watchDefer.reject)
		.on("add", watchDefer.ready);

		return promise;
	})

	.nodeify(cb);
}

function copyFile(from, to) {
	return mkdirp(path.dirname(to)).then(function() {
		return cp(from, to);
	});
}

var getModuleVersions = (function() {
	var printPkgVersions = (function(names) {
		console.log(JSON.stringify(names.reduce(function(pkgs, n) {
			try {
				pkgs[n] = require(n + "/package.json").version;
			} catch(e) {
				pkgs[n] = false;
			};
			
			return pkgs;
		}, {})));
	}).toString().replace(/\s+/g, " ");

	function cmd(names) {
		return [ "node -e '(", printPkgVersions, ")(", JSON.stringify(names), ")'" ].join("");
	}

	return function(dir, names) {
		return new Promise(function(resolve, reject) {
			exec(cmd(names), { cwd: dir }, function(err, stdout, stderr) {
				if (err) reject(err);
				else resolve(stdout ? JSON.parse(stdout) : null);
			});
		});
	}
})();