define(["soilJS/eh"],function(eh){
	return {
		name: "helper", 
		met:function(){return true;}, 
		br: function(message) {
			console.log("br: " + message)
			vvvvvvvv.aaaaaa();
			eh.call();
		}
	};
})
