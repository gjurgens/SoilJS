define("soilJS/main",["soilJS/errorHandler","soilJS/helper","soilJS/main"], function(errorHandler, helper, main){
	helper.met();
	helper.br("from main");
	return {prop: 1, k: helper.name};
});
