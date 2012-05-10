define(["soilJS/utils/bar"], function(bar) {
	var me = {};
	me.toString = function() {
		return "Im base foo, and I've just called base bar who says: " + bar;
	}
	return me;
});
