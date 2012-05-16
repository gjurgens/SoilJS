var requirejsTestHelper = function() {
	return require.config({
		context: "cont-" + (new Date()).getTime(),
		paths : {
			'jquery' : '/test/source/lib/jquery-1.7.2.min',
			'soilJS' : '/test/source'
		}
	//,urlArgs : "bust=" + (new Date()).getTime()
	});
}

