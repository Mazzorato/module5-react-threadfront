var _ = require("underscore"),
	Promise = require("bluebird"),
	path = require("path"),
	fs = Promise.promisifyAll(require("fs")),
	// mkdirp = Promise.promisify(require("mkdirp")),
	cpr = Promise.promisify(require("cpr")),
	ipm = require("./pm"),
	util = require("./util");

module.exports = function(dir, pkgnames, options, cb) {
	dir = path.resolve(dir || ".");
	options = options || {};

	var moddir = path.resolve(dir, "node_modules");
	var ignore = util.parseIgnoreRules(options.ignore);
	
	// match names to paths
	return ipm.list(dir, pkgnames, options)

	// install each package
	.each(function(pkg) {
		var pkgdir = path.join(moddir, pkg.name);

		// copy all items
		return cpr(pkg.__dirname, pkgdir, {
			deleteFirst: false,
			overwrite: options.overwrite,
			confirm: false,
			filter: function(file) {
				return ignore.filter([ path.relative(pkgdir, file) ]).length;
			}
		})

		// install dependencies
		.then(function() {
			if (options.deps === false) return;
			return util.npm(pkgdir, "install", pkgdir);
		});
	})

	// save to the infinite file
	.tap(function(pkgs) {
		if (options.save && pkgs.length) return ipm.add(dir, pkgs);
	})

	.nodeify(cb);
}