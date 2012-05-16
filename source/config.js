var require = {
	paths : {
		'jquery' : '/SoilJS/source/lib/jquery-1.7.2.min',
		'soilJS' : '/SoilJS/source'
	},
	priority : [ "jquery", "soilJS/eh"],
	urlArgs : "bust=" + (new Date()).getTime()
};
