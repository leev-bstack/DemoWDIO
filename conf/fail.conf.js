const date= new Date

exports.config = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    specs: [
        '../tests/specs/fail.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    services: [
        [
            'browserstack',{
            testObservability: true,
            testObservabilityOptions: {
                projectName: "WDIO Demo",
                buildName: "WDIO Fail demo"
            },
        }
    ],
    ],
    commonCapabilities: {
        'bstack:options': {
            buildName: 'WDIO Fail demo ' + date.toLocaleString(),
            projectName: 'WDIO Demo'
        }
    },
    capabilities: [
        {
            browserName: 'Chrome',
            'bstack:options': {
                browserVersion: 'latest',
                os: 'OS X',
                osVersion: 'Ventura'
          }
        },
        {
            browserName: 'Edge',
            'bstack:options': {
                browserVersion: 'latest',
                os: 'Windows',
                osVersion: '11'
          }
        },
        {
            browserName: 'Safari',
            'bstack:options': {
                deviceName: 'iPhone 14',
                osVersion: '16'
          }  
        },
        {
            browserName: 'Chrome',
            'bstack:options': {
                deviceName: 'Google Pixel 7',
                osVersion: '13'
            }
        }
      ],
    maxInstances: 5,

    logLevel: 'error',
    bail: 0,
    baseUrl: 'https:/www.browserstack.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
exports.config.capabilities.forEach(function (caps) {
    for (var i in exports.config.commonCapabilities)
      caps[i] = { ...caps[i], ...exports.config.commonCapabilities[i]};
  });