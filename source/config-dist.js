var require = (function(){
		var CDNDomainPath = 'http://cdn.otherdomain.tst:81/'
		return {
				paths : {
					'soilJS' : CDNDomainPath + 'SoilJS/dist',
					'jquery' : CDNDomainPath + 'SoilJS/dist/lib/jquery-1.7.2.min'
				},
				priority : [ "soilJS/lib/main" ],
				urlArgs : "bust=" + (new Date()).getTime()
			};
	})();
