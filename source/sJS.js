define(["errorHandler"], function(errorHandler) {
	return {
	    load: function (name, req, load, config) {
	    	name = "soilJS/" + name;
	    	console.log("load: " + name);
	        //req has the same API as require().
	        req([name], function (value) {
	        	console.log("before");
	        	console.log(value);
	        	try{
	        		load(value);        		
	        	} catch(ex) {
	        		ex.message += "; " + name;
	        		//errorHandler.handler(ex.message, ex.fileName, ex.number);
	        		console.log(ex.message);
	        		throw(ex);
	        	}
	            console.log("after")
	        });
	    }
	}
});
