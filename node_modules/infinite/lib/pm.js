var Promise = require("bluebird"),
	fs = Promise.promisifyAll(require("fs")),
	path = require("path"),
	util = require("./util"),
	_ = require("underscore");

exports.add = function add(dir, pkgnames, options) {
	dir = dir || ".";
	options = options || {};

	return Promise.all([
		readInfFile(dir),
		util.parsePackageNames(dir, pkgnames, true)
	])

	.spread(function(names, pkgs) {
		// calculate the added packages while prepping new name list
		var added = pkgs.reduce(function(add, pkg) {
			if (!_.contains(names, pkg.__dirname)) {
				add.push(pkg);
				names.push(pkg.__dirname);
			}

			return add;
		}, []);

		// skip writing if none are being added
		if (!added.length) return [];

		// write names to disk
		return writeInfFile(dir, names).return(added);
	});
}

exports.remove = function remove(dir, pkgnames, options) {
	dir = dir || ".";
	options = options || {};
	
	return Promise.all([
		readInfFile(dir),
		util.parsePackageNames(dir, pkgnames, false)
	])

	.spread(function(names, pkgs) {
		return writeInfFile(dir, _.difference(names, pkgs)).return(_.intersection(names, pkgs));
	});
}

var list =
exports.list = function list(dir, pkgnames, options) {
	if (!_.isArray(pkgnames) && options == null) {
		options = pkgnames;
		pkgnames = [];
	}

	dir = dir || ".";
	options = options || {};

	return Promise.try(function() {
		if (pkgnames == null || !pkgnames.length) return readInfFile(dir);
		return pkgnames;
	}).then(function(names) {
		return util.parsePackageNames(dir, names, true);
	});
}

exports.infFileName = ".infinite";

var getInfPath =
exports.getInfPath = function getInfPath(dir) {
	return path.resolve(dir || ".", exports.infFileName);
}

function readInfFile(dir) {
	return fs.readFileAsync(getInfPath(dir), { encoding: "utf-8" })
	.then(function(data) {
		return data.trim().split("\n").map(function(s) {
			return s.trim();
		}).filter(function(n) {
			return n != "";
		});
	}, function(e) {
		if (util.isFileError(e, "ENOENT")) return [];
		throw e;
	});
}

function writeInfFile(dir, names) {
	var inffile = getInfPath(dir);
	
	names = names.map(function(d) {
		return typeof d === "string" ? d.trim() : "";
	}).filter(function(n) {
		return n != "";
	});

	// delete file if it is empty
	if (!names.length) return fs.unlinkAsync(inffile);

	// or write each name to a new line
	return fs.writeFileAsync(inffile, names.join("\n"), { encoding: "utf-8" });
}