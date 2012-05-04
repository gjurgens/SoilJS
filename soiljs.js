/**
 * @author Gabriel JŸrgens
 */
var soilJS = (function() {

	// Define a local copy of soilJS
	var soilJS = function( selector, context ) {
			// The soilJS object is actually just the init constructor 'enhanced'
			return new soilJS.fn.init( selector, context, rootjQuery );
		},
	
		// Map over soilJS in case of overwrite
		_soilJS = window.soilJS;
	
	soilJS.fn = soilJS.prototype = {
		constructor: soilJS,
		init: function( selector, context, rootjQuery ) {
			return soilJS.makeArray( selector, this );
		}
	};
	
	// Give the init function the soilJS prototype for later instantiation
	soilJS.fn.init.prototype = soilJS.fn;
	
	soilJS.fn.getVersion = soilJS.getVersion = function() {
		return "0.1.0";
	}
	return soilJS;

})();