({
    appDir: "js",
    baseUrl: ".",
    dir: "js-versioned",
    paths: {
        soilJS: "../js-versioned"
    },
    modules: [
              {
                  name: "soilJS/main"
              }
    ],
    fileExclusionRegExp: /^(\.|build\.js)/
})

