var require = {
	paths : {
		'jquery' : '/SoilJS/jsLib/jquery-1.7.2.min',
		'soilJS' : '/SoilJS/soilJS/js',
		'home'   : '/SoilJS/home/js',
		'flights': '/SoilJS/flights/js'
	},
	priority : [ "jquery", "soilJS/main"],
	urlArgs : "bust=" + (new Date()).getTime()
};
