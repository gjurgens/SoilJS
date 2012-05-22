({
    appDir: "../source",
    baseUrl: ".",
    dir: "../dist",
    paths: {
        soilJS: "",
        jquery: "lib/jquery-1.7.2.min",
        sinon: "lib/sinon-1.3.4"
    },
    modules: [
              {
            	  name: "soilJS/lib/main",
            	  include: ["jquery", "sinon", "soilJS/shieldDefine"]
              },
              {
            	  name: "soilJS/main",
            	  exclude: ["jquery", "sinon", "soilJS/shieldDefine"]
              
              }
    ],
    fileExclusionRegExp: /^(\.|build\.js)/
})
