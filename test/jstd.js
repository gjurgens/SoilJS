TestMain = AsyncTestCase("TestMain");
TestMain.prototype.testMainReturns = function(queue) {
	//Declare scope vars
	var main = null;
	
	//First step: Load dependencies and set scope variables for asserts
	queue.call("Load Dependencies", function(callbacks) {
		var onload = callbacks.noop();
		
		(requirejsTestHelper())(["soilJS/main"], function(_main){
			main = _main;
			onload();
		});
		
	});
	
	queue.call("asserts", function(){		
		assertObject("main object instatiated", main);
		assertEquals("helper.prop", 1, main.prop);
		assertEquals("helper.k", "helper", main.k);
	})

}


TestHelper = AsyncTestCase("TestHelper");
TestHelper.prototype.testHelperReturns = function(queue) {
	//Declare scope vars
	var helper = null;
	
	//First step: Load dependencies and set scope variables for asserts
	queue.call("Load Dependencies", function(callbacks) {
		var onload = callbacks.noop();
		
		(requirejsTestHelper())(["soilJS/helper"], function(_helper){
			helper = _helper;
			onload();
		});
		
	});
	
	queue.call("asserts", function(){		
		assertObject("helper object instatiated", helper);
		assertEquals("helper.name", "helper", helper.name);
		assertFunction("helper.met is a function", helper.met);
		assertTrue("helper.met returns true", helper.met());
	})

}


