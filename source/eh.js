define(function() {
	console.log("eh");
	function productionize(object) {
		console.log("productionize")
		var name, method;
		
		for (name in object) {
			method = object[name];
			if (typeof method == "function") {
				object[name] = function(name, method) {
					return function() {
						try {
							return method.apply(this, arguments);
						} catch (ex) {
							ex.message += "; Function Call " + name
							+ "()";
							throw ex;
						}
					};
					
				}(name, method);
			}
		}
	}
	
	define = function(_define) {
		return function(name, deps, callback) {
			var module = _define(name, deps, callback);
			productionize(module);
			return module;
		};
	}(define);
})