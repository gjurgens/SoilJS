var requirejsTestHelper = function(interval) {
	//Defaul interval to renew context is 5 seconds
	if(!interval || interval < 0) interval = 5000;
	return require.config({
		//Unique context generation for avoiding internal caching between tests		
		context: "cont-" + Math.round((new Date()).getTime()/interval),
		paths : {
			'jquery' : '/test/source/lib/jquery-1.7.2.min',
			'soilJS' : '/test/source'
		}
	});
}

