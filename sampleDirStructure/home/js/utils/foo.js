define(["./bar"], function(bar) {
	var me = {};
	me.toString = function() {
		return "Im foo, and I've just called bar who says: " + bar;
	}
	return me;
});
