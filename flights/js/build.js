({
    appDir: ".",
    baseUrl: ".",
    dir: "../js-versioned",
    paths: {
        jquery: "empty:",
        soilJS: "empty:",
        flights: "",
    },
    modules: [
              {
                  name: "common/main"
              },
              {
                  name: "flights1", exclude: ["common/main"]
              },
              {
                  name: "flights2", exclude: ["common/main"]
              }
    ],
    fileExclusionRegExp: /^(\.|build\.js)/
})
