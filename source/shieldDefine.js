define([ "soilJS/errorHandler" ], function (errorHandler) {
    "use strict";
    function shieldReturnedObject(object, module) {
        var name, method;

        for (name in object) {
            method = object[name];
            if (typeof method === "function") {
                object[name] = function (def, name) {
                    return function () {
                        try {
                            return def.apply(this, arguments);
                        } catch (ex) {
                            ex.message += "; module: '" + module
                                    + "', method: '" + name + "'";
                            errorHandler.addToStack(ex.message);
                            throw ex;
                        }
                    };
                }(method, name);
            }
        }

        object.soilJSShielded = true;
    }

    if (!require.soilJSShielded) {
        define = function (origDefine) {
            return function () {
                var callbackArgIndex = 2, name = "anonymous", deps = [];

                // Allow for anonymous functions
                if (typeof arguments[0] !== 'string') {
                    callbackArgIndex--;
                } else {
                    name = arguments[0];
                }

                // This module may not have dependencies
                if (!(arguments[callbackArgIndex - 1] instanceof Array)) {
                    callbackArgIndex--;
                } else {
                    deps = arguments[callbackArgIndex - 1];
                }

                arguments[callbackArgIndex] = function (orig) {
                    return function () {
                        var i = 0;
                        for ( var arg in arguments) {
                            if (typeof arguments[arg] === "object"
                                    && (!arguments[arg].soilJSShielded)) {
                                shieldReturnedObject(arguments[arg], deps[i]);
                            }
                            i++;
                        }
                        ;
                        try {
                            return orig.apply(this, arguments);
                        } catch (e) {
                            e.message += "; module: '" + name + "'";
                            errorHandler.addToStack(e.message);
                            throw (e);
                        }
                    }
                }(arguments[callbackArgIndex]);

                // arguments[callbackArgIndex] =
                // shield(arguments[callbackArgIndex], name, "module");
                origDefine.apply(this, arguments);
            }
        }(define);
    }
    require.soilJSShielded = true;
});
