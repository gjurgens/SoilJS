define(["./bar","jquery"], function(bar) {
	var me = {};
	me.toString = function() {
		return "Im flights foo, and I've just called flights bar who says: " + bar;
	}
	console.log($("body").html());

	return me;
});
