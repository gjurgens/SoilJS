define(["soilJS/shieldDefine", "soilJS/helper","soilJS/main"], function(shieldDefine, helper, main){
	helper.met();
	helper.br("from main");
	return {prop: 1, k: helper.name};
});
