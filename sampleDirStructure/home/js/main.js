define(["./utils/foo", "soilJS/utils/foo"], function(foo, base_foo) {
	console.log("foo loaded and says: " + foo);
	console.log("I'm foo, and base.utils.foo says: " + base_foo);
});