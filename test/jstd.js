require(["soilJS/main"],function(main){
	TestCore = TestCase("TestCore");
	TestCore.prototype.setUp = function() {
	}

	TestCore.prototype.testReturns = function() {
		assertFunction("require function declared", require);
		assertObject("main object instatiated", main);
		assertEquals("main.prop", 1, main.prop);
		assertEquals("main.k", "helper", main.k);
	}
	
});

require(["soilJS/helper"],function(helper){
	TestCore = TestCase("TestHelper");
	TestCore.prototype.setUp = function() {
	}

	TestCore.prototype.testReturns = function() {
		assertFunction("require function declared", require);
		assertObject("helper object instatiated", helper);
		assertEquals("helper.name", "helper", helper.name);
	}
	
});
