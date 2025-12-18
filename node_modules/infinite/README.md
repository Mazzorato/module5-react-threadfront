# Infinite

Copies a node module somewhere in your system into local `node_modules/`. This is similar to `npm link`, but instead of symlinking the folder, it duplicates all of the contents.

To install:

```sh
npm install infinite -g
```

To install a module, run the install command with a path the folder. This will copy all the contents into `./node_modules/` and then run `npm install` on the destination directory.

```sh
inf install ~/some_pkg
```

Infinite can also continuously duplicate files as they change. This will also watch `package.json` for changes, installing any missing dependencies.

```sh
inf watch ~/some_pkg
```
