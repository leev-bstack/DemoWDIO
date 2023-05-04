exports.config = {
    runner: 'local',

    specs: [
        '../tests/specs/single.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    maxInstances: 1,
    capabilities: [{

        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true

    }],
    logLevel: 'info',

    bail: 0,
    baseUrl: 'https://www.browserstack.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['chromedriver'],

    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
