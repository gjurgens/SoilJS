var require = {
	paths : {
		'jquery' : '/SoilJS/sampleDirStructure/jsLib/jquery-1.7.2.min',
		'soilJS' : '/SoilJS/sampleDirStructure/soilJS/js',
		'home'   : '/SoilJS/sampleDirStructure/home/js',
		'flights': '/SoilJS/sampleDirStructure/flights/js'
	},
	priority : [ "jquery", "soilJS/main"],
	urlArgs : "bust=" + (new Date()).getTime()
};
