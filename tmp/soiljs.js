/**
 * @author Gabriel Jürgens
 */
var soilJS = (function() {

	// Define a local copy of soilJS
	var soilJS = function(className, args) {
		// The soilJS object is actually just the init constructor 'enhanced'
		return new soilJS.fn.init(className, args);
	};

	// Map over soilJS in case of overwrite
	var _soilJS = window.soilJS;

	soilJS.fn = soilJS.prototype = {
		constructor : soilJS,
		init : function(className, args) {
			args instanceof Array?args:[];
			className.apply(this, args);
			soilJS.productionize(this);
		}
	};

	// Give the init function the soilJS prototype for later instantiation
	soilJS.fn.init.prototype = soilJS.fn;
	soilJS.fn.getVersion = soilJS.getVersion = function() {
		return "0.1.0";
	}
	soilJS.fn.productionize = soilJS.productionize = function(object){

	    var name, method;

	    for (name in object){
	        method = object[name];
	        if (typeof method == "function"){
	            object[name] = function(name, method){
	                return function(){
	                    try {
	                        return method.apply(this, arguments);
	                    } catch (ex) {
	                        ex.message += "; Function Call " + name + "()";
	                        throw ex;
	                    }
	                };

	            }(name, method);
	        }
	    }
	} 
	
	
	return soilJS;

})();
