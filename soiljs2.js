/**
 * @author Gabriel Jürgens
 */
var soilJS = (function() {

	// Define a local copy of soilJS
	var soilJS = function(classConstructor, args) {
		// The soilJS object is actually just the init constructor 'enhanced'
		//return new soilJS.fn.init(classConstructor, args);
		if(!classConstructor.prototype.instantiated) {
			classConstructor.prototype = new soilJS.fn.init(classConstructor, args);
		}
		var newInstance =  new classConstructor;
		newInstance.constructor = classConstructor;
		newInstance.constructor.apply(newInstance, args)
		return newInstance;
	};

	// Map over soilJS in case of overwrite
	var _soilJS = window.soilJS;

	soilJS.fn = soilJS.prototype = {
		constructor : soilJS,
		init : function(classConstructor, args) {
			//args instanceof Array?args:[];
			//classConstructor.apply(this, args);
		},
		soilFunction : function() {
			return "yeah!";
		},
		instantiated : true
	};

	// Give the init function the soilJS prototype for later instantiation
	soilJS.fn.init.prototype = soilJS.fn;
	soilJS.fn.getVersion = soilJS.getVersion = function() {
		return "0.1.0";
	}

	return soilJS;

})();
	