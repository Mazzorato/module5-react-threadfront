# Async Wait

This is small JavaScript utility that waits for many async operations to finish. This is very similar to something like `async.map` or `Promise.all`, but with a much looser API.

## Install

Download the latest version from our [release page](https://github.com/BeneathTheInk/asyncwait/releases) and use via a script tag. The variable `asyncWait` will be attached to `window`.

```html
<script type="text/javascript" src="asyncwait.js"></script>
```

If using Browserify or Node.js, you can install via NPM and use via `require("asyncwait")`.

```shell
$ npm install asyncwait
```

## Usage

Call `asyncWait()` with an onEmpty callback. This function will be called when the wait queue is completely drained. This will return a wait function which can be wrapped around any async callback.

```javascript
var wait = asyncWait(function() {
    console.log("done");
});

setTimeout(wait(function() {
    console.log("my timeout");
}), 100);
```

It also plays really nice with ES6 Promises:

```javascript
var wait = asyncWait(function() {
    console.log("done");
});

// called outside so it is registered immediately
var done = wait();

myAsyncTask().then(function() {
    console.log("success");
    done();
}, done);
```