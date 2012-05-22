var require = (function(){
		var CDNDomainPath = 'http://cdn.otherdomain.tst:81/'
		return {
				paths : {
					'errorHandler' : CDNDomainPath + 'SoilJS/source/errorHandler',
					'soilJS'       : CDNDomainPath + 'SoilJS/source',
					//'sJS'          : CDNDomainPath + 'SoilJS/source/sJS',
					'jquery'       : CDNDomainPath + 'SoilJS/source/lib/jquery-1.7.2.min'
				},
				priority : [ "jquery", "soilJS/shieldDefine" ],
				urlArgs : "bust=" + (new Date()).getTime()
			};
	})();
