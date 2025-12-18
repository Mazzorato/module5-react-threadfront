#!/usr/bin/env node

process.title = "inf";

var _ = require("underscore"),
	minimist = require("minimist"),
	spawn = require("child_process").spawn,
	path = require("path"),
	ipm = require("../lib/pm.js");

require("bluebird").longStackTraces();

var argv = minimist(process.argv.slice(2), {
	string: [ "ignore" ],
	boolean: [ "version", "help", "save", "deps", "sync" ],
	alias: {
		v: "version",
		h: "help"
	},
	default: {
		"deps": true
	},
	'--': true
});

if (argv.version) {
	var pkg = require("../package.json");
	console.log(pkg.name + " v" + pkg.version);
	return process.exit(0);
}

if (argv._[0] == null || argv.help) {
	console.log("Usage: inf <command> [options]");
	return process.exit(0);
}

var cwd = process.cwd();

switch(argv._[0]) {
	case "add":
		ipm.add(cwd, argv._.slice(1), argv).then(function(names) {
			if (!names.length) return console.log("No packages added.");
			console.log("\n  Added " + names.length + " package" + (names.length === 1 ? "" : "s" ) + ":");
			names.forEach(function(n) { console.log("    + %s@%s (%s)", n.name, n.version, n.__dirname); });
			console.log();
		});
		break;

	case "rm":
	case "remove":
		ipm.remove(cwd, argv._.slice(1), argv).then(function(names) {
			if (!names.length) return console.log("No packages removed.");
			console.log("\n  Removed " + names.length + " package" + (names.length === 1 ? "" : "s" ) + ":");
			names.forEach(function(n) { console.log("    - %s", n); });
			console.log();
		});
		break;

	case "ls":
	case "list":
		ipm.list(cwd, argv).then(function(names) {
			if (!_.size(names)) return console.log("No packages.");
			console.log("\n  Packages (%s):", ipm.infFileName);
			names.forEach(function(n) { console.log("    + %s@%s (%s)", n.name, n.version, n.__dirname); });
			console.log();
		});
		break;

	case "install":
		require("../lib/install.js")(cwd, argv._.slice(1), argv).then(function(names) {
			if (!names.length) return console.log("No packages installed.");
			console.log("\n  Installed " + names.length + " package" + (names.length === 1 ? "" : "s" ) + ":");
			names.forEach(function(n) { console.log("    + %s@%s (%s)", n.name, n.version, n.__dirname); });
			console.log();
		});
		break;

	case "watch":
		require("../lib/watch.js")(cwd, argv._.slice(1), argv).then(function(names) {
			if (!names.length) return console.log("No packages installed.");
			console.log("\n  Watching " + names.length + " package" + (names.length === 1 ? "" : "s" ) + ":");
			names.forEach(function(n) { console.log("    + %s@%s (%s)", n.name, n.version, n.__dirname); });
			console.log("\n  Ctrl-C to exit\n");
		});
		break;

	default:
		console.error("Unknown command '" + argv._[0] + "'");
		break;
}