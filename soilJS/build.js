({
    appDir: "js",
    baseUrl: ".",
    dir: "js-versioned",
    paths: {
        jquery: "empty:",
        soilJS: "../js-versioned"
    },
    modules: [
              {
                  name: "soilJS/main"
              }
    ],
    fileExclusionRegExp: /^(\.|build\.js)/
})

