/*
console.log("main loadeddddddd")
var requireJstd = null;


TestCore = TestCase("TestCore");
TestCore.prototype.setUp = function() {
	console.log("setup core");
}


	console.log("module main loaded");
	TestCore.prototype.testReturns = function() {
		console.log("test core cases");
		requireJstd(["soilJS/main"],function(main){
			console.log("test core cases require");
			assertFunction("require function declared", require);
			assertObject("main object instatiated", main);
			assertEquals("main.prop", 1, main.prop);
			assertEquals("main.kk", "helper", main.kk);
			//assertEquals("main.met", true, main.met());
		});
	}
	


TestHelper = TestCase("TestHelper");
TestHelper.prototype.setUp = function() {
	console.log("setup helper");
	requireJstd = require.config({
		context: "cont-" + (new Date()).getTime(),
		paths : {
			'jquery' : '/test/source/lib/jquery-1.7.2.min',
			'soilJS' : '/test/source'
		},
		urlArgs : "bust=" + (new Date()).getTime()
	});
}

//requireJstd(["soilJS/helper"],function(helper){
	console.log("module helper loaded");
	TestHelper.prototype.testReturns = function() {
		var helper = null;
		requireJstd(["soilJS/helper"],function(_helper){helper = _helper});
		console.log("Helper: " + helper);
		console.log("test helper cases");
		assertFunction("require function declared", require);
		assertObject("helper object instatiated", helper);
		assertEquals("helper.name", "helper", helper.name);
	}
	
//});
*/
/*
var AsynchronousTest = AsyncTestCase('AsynchronousTest');

AsynchronousTest.prototype.testSomethingComplicated = function(queue) {
  var state = 0;

  queue.call('Step 1: schedule the window to increment our variable 5 seconds from now.', function(callbacks) {
    var myCallback = callbacks.add(function() {
      ++state;
    });
    window.setTimeout(myCallback, 5000);
  });

  queue.call('Step 2: then assert our state variable changed', function() {
    assertEquals(1, state);
  });
};
*/

var getRequireJSConfig = function() {
	return require.config({
		context: "cont-" + (new Date()).getTime(),
		paths : {
			'jquery' : '/test/source/lib/jquery-1.7.2.min',
			'soilJS' : '/test/source'
		}
	//,urlArgs : "bust=" + (new Date()).getTime()
	});
}

/*
var loadDependencies = function(callbacks,modules, callback){
	console.log("loading dependencies");
	//console.log(arguments);
	var jstdRequire = getRequireJSConfig();
	jstdRequire(modules, callback);
};

*/


TestHelper = AsyncTestCase("TestHelper");

TestHelper.prototype.testHelperReturns = function(queue) {
	var helper = null;
	
	console.log("setup async helper");
	
	queue.call("Load Dependencies", function(callbacks) {

		/*
		loadDependencies(callbacks,["soilJS/helper"],function(_helper){
			console.log("_Helper: " + _helper);
			helper = _helper;
			onDependenciesLoaded();
		});
		*/
		//var jstdRequire = getRequireJSConfig();
		
		var onDependenciesLoaded = callbacks.noop();
		
		(getRequireJSConfig())(["soilJS/helper"], function(_helper){
			console.log("_Helper: " + _helper);
			helper = _helper;
			onDependenciesLoaded();
		});
		
	});
	
	queue.call("asserts", function(){		
		console.log("Helper: " + helper);
		console.log("test helper cases");
		assertFunction("require function declared", require);
		assertObject("helper object instatiated", helper);
		assertEquals("helper.name", "helper", helper.name);
	})

}


