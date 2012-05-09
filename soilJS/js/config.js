var require = {
	paths : {
		'jquery' : '/rjs/jsLib/jquery-1.7.2.min',
		'soilJS' : '/rjs/soilJS/js',
		'home'   : '/rjs/home/js',
		'flights': '/rjs/flights/js'
	},
	priority : [ "jquery", "soilJS/main"],
	urlArgs : "bust=" + (new Date()).getTime()
};
