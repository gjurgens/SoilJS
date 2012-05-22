define(function(){
	var errorHandler = function() {
		var LOG_SERVICE_BASE_URL = "/loggerjs";
		var DEFAULT_APP = "default";
		var RND_INSTANCE_ID = (Math.floor((900000000000)*Math.random()) + 100000000000);

		//Reglas para asignacion automatica de applicacion
		var APPLICATION_MAP = {
				"home":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/Belo-Horizonte|\/Brasilia|\/curitiba|\/fortaleza|\/porto-alegre|\/recife|\/Rio-de-Janeiro|\/Salvador|\/medellin|\/Chicago|\/Houston|\/Los-Angeles|\/Nueva-York|\/Orlando|\/San-Antonio|\/San-Francisco|\/Guadalajara|\/Monterrey|\/\?tab\=car|\/\?tab\=cru)?($|\/$)/i,
				"homeFlights":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+\/(vuelos|passagens-aereas)($|\/$)/i,
				"homeHotels":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+\/(hoteles|hoteis)($|\/$)/i,
				"homePakages":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+\/(paquetes|pacotes)($|\/$)/i,
				"flightsResult":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/search\/flights\/|\/shop\/flights\/search\/)/i,
				"flightsDisambiguation":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/search\/Disambiguation\/)/i,
				"flightsCheckout":/^https:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/Booking\/FlightCheckOut\/)/i,
				"hotelsResult":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/search\/Hotel\/)[A-z0-9]{3}\//i,
				"hotelsDetail":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/search\/Hotel\/Details\/)/i,
				"hotelsCheckout":/^https:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/Booking\/HotelCheckout\/)/i,
				"packagesResult":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/Search\/Packages\/)([A-z0-9]{3}\/){2}/i,
				"packagesDetail":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/Search\/Packages\/Details\/)/i,
				"packagesCheckout":/^https:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/Booking\/PackageCheckout\/)/i,
				"landingFlights":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/(vuelos|passagens-aereas)\/)([A-z0-9]{3}\/){2}/i,
				"landingHotels":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/(hoteles|hoteis)\/hl\/)[A-z0-9]{3}\//i,
				"landingHotelsDetail":/^http:\/\/(www|ic|rc|bc)(\.us)*\.(despegar|decolar)\.[a-z.]+(\/(hoteles|hoteis)\/h-)[0-9]+\//i
		}
		/**
		 * Retorna un UOW si esta definida la variable global, o un numero
		 * aleatorio si no lo esta
		 * @returns String UOW identifier
		 */
		var getUOW = function() {
			var X_UOW = window.X_UOW ? "UOW-" + window.X_UOW : "RND_" + RND_INSTANCE_ID;
			return X_UOW;
		}

		/**
		 * Informacion de la applicacion actual
		 */
		var CurrentApplication = function() {
			var currentApplication = window.CURRENT_APPLICATION ? window.CURRENT_APPLICATION : DEFAULT_APP;
			var guessed = false;
			return {
				get:function() {
					currentApplication = window.CURRENT_APPLICATION ? window.CURRENT_APPLICATION : DEFAULT_APP;
					if(currentApplication === DEFAULT_APP){
						var href = window.location.href;
						var app, sublen = 0;
						for(var app in APPLICATION_MAP) {
							if(APPLICATION_MAP[app].test(href)) {
								currentApplication = app;
								break;
							}
						}
						guessed=(currentApplication != DEFAULT_APP);
					}
					return currentApplication;
				},
				toString:function() {
					var msg = "Application=" + currentApplication;
					if(guessed) msg += " (guessed)";
					msg += ";";
					return msg;
				},
				getLogUrl:function() {
					return LOG_SERVICE_BASE_URL + "/" + currentApplication;
				},
				isGuessed:function() {
					return guessed;
				}
			}

		}();

		/**
		 * Informacion del Browser
		 * @return String Informacion del Browser
		 */
		var getUserAgent = function() {
			var userAgent = "";
			if(navigator) {
				userAgent = navigator.userAgent ? navigator.userAgent : "undefined";
			} else {
				userAgent = "undefined";
			}
			return  "UserAgent=\"" + userAgent + "\";";
		}

		/**
		 * Informacion basica del error
		 * @return {Object}
		 */
		var CurrentError = function() {
			function isCDNError(msg, url, linenumber) {
				return (msg == "Script error." && linenumber == 0);
			}
			return {
				curMsg:"",
				curUrl:"",
				curLineNumber:"",
				curLocationHref:window.location.href,
				curStack:"",
				set:function(msg, url, linenumber) {
					this.curUrl = url;
					this.curLineNumber = linenumber;						
					if(!isCDNError(msg, url, linenumber)) {
						this.curMsg = msg;
					} else {
						this.curMsg = "Error not decribed because cross domain window.onerror restrictions.";
					}
				},
				addToStack:function(msg) {
					if(msg.substr(0,this.curStack.length) == this.curStack) {
						msg = msg.substr(this.curStack.length, msg.length);						
					}
					this.curStack += msg;
				},
				clearStack:function() {
					this.curStack = "";
				},
				toString:function() {
					return "Message=\"" + this.curMsg + ((this.curStack != "") ? ";" + this.curStack : "") + "\"; Url=" + this.curUrl + "; LineNumber=" + this.curLineNumber + "; LocationHref=" + this.curLocationHref + ";";
				}
			}
		}();
		/**
		 * Metodo que envia un string a un servicio en forma asincronica
		 * @param {Object} msg
		 */
		var send = function(msg) {
			if(typeof XMLHttpRequest!="undefined"){
				var oXmlHttp = new XMLHttpRequest();
				oXmlHttp.open("POST",CurrentApplication.getLogUrl(),true);
				oXmlHttp.send(msg);
			}

		}

		return {
			/**
			 * Esta funcion se llama luego de hacer todo el handle del error capturado
			 * La idea es hacer un override de esta funcion si es necesario hacer algun
			 * tratamiento especial de los errores.
			 * Esta funcion, si retorna False, envia el error al browser, si retorna
			 * true, el error se considera atrapado, y el browser no vera el error.
			 *
			 * @param {string} msg Descripcion del error enviada por el browser
			 * @param {string} url Url de la pagina que genero el error
			 * @param {int} linenumber Linea donde ocurrio el error
			 */
			throwOverride:function(msg, url, linenumber) {
				return false;
			},
			/**
			 * Esta es la funcion que se bindea con el evento window.onerror
			 *
			 * @param {string} msg Descripcion del error enviada por el browser
			 * @param {string} url Url de la pagina que genero el error
			 * @param {int} linenumber Linea donde ocurrio el error
			 */
			handler:function(msg, url, linenumber) {
				CurrentError.set(msg, url, linenumber);
				CurrentApplication.get();
				send(this.toString());
				return this.throwOverride(msg, url, linenumber);
			},
			addToStack:function(msg) {
				CurrentError.addToStack(msg);
			},
			/**
			 * Sobreescribe el toString de Object, y retorna un string en formato de log
			 * con toda la info del error
			 */
			toString:function() {
				var str = "";

				str += "[" + getUOW() + "] ";
				str += CurrentApplication.toString() + " ";
				str += CurrentError.toString() + " ";
				str += getUserAgent() + " ";
				return str;
			}
		}
	}();



	window.onerror = function(msg, url, linenumber){
		return errorHandler.handler(msg, url, linenumber);
	};
	return errorHandler;
})



