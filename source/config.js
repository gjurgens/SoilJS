var require = (function(){
		var CDNDomainPath = 'http://cdn.otherdomain.tst:81/'
		return {
				paths : {
					'soilJS' : CDNDomainPath + 'SoilJS/source',
					'jquery' : CDNDomainPath + 'SoilJS/source/lib/jquery-1.7.2.min'
				},
				priority : [ "jquery"],
				urlArgs : "bust=" + (new Date()).getTime()
			};
	})();
