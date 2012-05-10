define(["jquery","qunit"], function($){
	QUnit.config.autostart = false;
	console.log($);
	require(["soilJS/main"],function(main){
		console.log(main);
		module("Core");
		test("soilJS/mains returns an object", function() {
			equal(typeof main,"object","typeof module is 'object'");
		});
	});
	QUnit.start();
})
