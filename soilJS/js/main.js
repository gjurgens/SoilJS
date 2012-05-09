define(["soilJS/utils/foo", "soilJS/utils/bar"], function(utils_foo, utils_bar) {
	console.log("main base loaded")
	var base = {};
	base.utils = {};
	base.utils.foo = utils_foo;
	base.utils.bar = utils_bar;
	return base;
});