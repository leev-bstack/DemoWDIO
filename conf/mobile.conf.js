const date= new Date

exports.config = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    specs: [
        '../tests/specs/mobile.js'
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
                buildName: "WDIO Mobile demo"
            },
        }
    ],
    ],
    commonCapabilities: {
        'bstack:options': {
            buildName: 'WDIO Mobile demo ' + date.toLocaleString(),
            projectName: 'WDIO Demo',
            networkLogs: true
        }
      },
    capabilities: [
        {
            browserName: 'Safari',
            'bstack:options': {
                deviceName: 'iPhone 14',
                osVersion: '16'
          }  
        },
        {
            browserName: 'Samsung',
            'bstack:options': {
                deviceName: 'Samsung Galaxy S23',
                osVersion: '13'
            }
        },
        {
            browserName: 'Safari',
            'bstack:options': {
                deviceName: 'iPad 10th',
                osVersion: '16'
          }  
        },
        {
            browserName: 'Chrome',
            'bstack:options': {
                deviceName: 'Google Pixel 7',
                osVersion: '13'
            }
        },
        {
            browserName: 'Chrome',
            'bstack:options': {
                deviceName: 'Google Pixel 6',
                osVersion: '12'
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