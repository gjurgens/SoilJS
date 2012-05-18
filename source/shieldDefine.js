define(["soilJS/errorHandler"], function(errorHandler){

	function shieldReturnedObject(object) {
		var name, method;
		
		for (name in object) {
			method = object[name];
			if (typeof method == "function") {
				object[name] = function(name, method) {
					return function() {
						try {
							return method.apply(this, arguments);
						} catch (ex) {
							ex.message += "; method: '" + name + "'";
							throw ex;
						}
					};
					
				}(name, method);
			}
		}
		
		object.soilJSShielded = true;
	}


	
	define = function(origDefine) {
		return function() {

			var callbackArgIndex = 2;
			var name = "anonymous";
			
	        //Allow for anonymous functions
	        if (typeof arguments[0] !== 'string') {
	        	callbackArgIndex--;
	        } else {
	        	name = arguments[0];
	        }
	        
	        //This module may not have dependencies
	        if (!(arguments[callbackArgIndex - 1] instanceof Array)) {
	        	callbackArgIndex--;
	        }

	        arguments[callbackArgIndex] = function(orig) {
	    		return function() {
	    			for(arg in arguments) {
	    				if(typeof arguments[arg] === "object" && (!arguments[arg].soilJSShielded)) {
	    					shieldReturnedObject(arguments[arg]);
	    				}
	    			};
	    			try{
	    				return orig.apply(this, arguments);				
	    			} catch(e) {
	    				e.message += "; module: '" + name + "'";
	    				errorHandler.handler(e.message, e.fileName, e.number);
	    				throw(e);				
	    			}
	    		}
	    	}(arguments[callbackArgIndex]);

			origDefine.apply(this, arguments);
		}
	}(define);
})
