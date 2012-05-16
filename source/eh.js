define(function() {
	console.log("eh");
	function productionize(object) {
		console.log("productionize" + object)
		var name, method;
		
		for (name in object) {
			console.log(name);
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
			try{
				var module = _define(name, deps, callback);
				console.log("try");
			} catch(e) {
				
			}
			console.log("define: " + module)
			productionize(module);
			return module;
		};
	}(define);
})
