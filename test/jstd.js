TestCore = TestCase("TestCore");
TestCore.prototype.setUp = function() {
}

require(["soilJS/main"],function(main){

	TestCore.prototype.testReturns = function() {
		assertFunction("require function declared", require);
		assertObject("main object instatiated", main);
		assertEquals("main.prop", 1, main.prop);
		assertEquals("main.k", "helper", main.k);
	}
	
});

TestHelper = TestCase("TestHelper");
TestHelper.prototype.setUp = function() {
}
require(["soilJS/helper"],function(helper){

	TestHelper.prototype.testReturns = function() {
		assertFunction("require function declared", require);
		assertObject("helper object instatiated", helper);
		assertEquals("helper.name", "helper", helper.name);
	}
	
});
