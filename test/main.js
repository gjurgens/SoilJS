define(["jquery","qunit"], function($){
	QUnit.config.autostart = false;
	require(["soilJS/main"],function(main){
		module("Core");
		test("soilJS/mains returns an object", function() {
			equal(typeof main,"object","typeof module is 'object'");
		});
	});
	QUnit.start();
})
