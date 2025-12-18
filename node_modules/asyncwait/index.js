// create a wait queue
// onEmpty is called when the queue hits 0
module.exports = function asyncWait(onEmpty, ctx) {
	var counter = 0;
	setTimeout(wait(), 0); // deferred call immediately
	return wait;
 
 	// the function that generates a wait function
	function wait(cb) {
		var called = false;
		++counter;
		
		return function() {
			// prevent a wait function from being called twice
			if (called) return;
			called = true;

			// decrement counter before callbacks
			--counter;

			// run the callbacks
			if (typeof cb === "function") cb.apply(this, arguments);
			if (!counter && typeof onEmpty === "function") onEmpty.call(ctx);
		}
	};
};