const date= new Date

exports.config = {
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,

    specs: [
        '../tests/specs/parallel/parallel*.js'
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
                buildName: "WDIO Parallel demo"
            },
        }
    ],
    ],
    commonCapabilities: {
        'bstack:options': {
            buildName: 'WDIO Parallel demo ' + date.toLocaleString(),
            projectName: 'WDIO Demo'
        }
      },
    capabilities: [
        {
            browserName: 'Chrome',
            'bstack:options': {
                browserVersion: 'latest',
                os: 'Windows',
                osVersion: '11'
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
                browserVersion: 'latest',
                os: 'OS X',
                osVersion: 'Ventura'
          }  
        },
        {
            browserName: 'Chrome',
            'bstack:options': {
                browserVersion: 'latest',
                os: 'OS X',
                osVersion: 'Ventura'
            }
        },
        {
            browserName: 'Firefox',
            'bstack:options': {
                browserVersion: 'latest',
                os: 'OS X',
                osVersion: 'Ventura'
            }
        },
        {
            browserName: 'Chrome',
            'bstack:options': {
                browserVersion: 'latest',
                os: 'Windows',
                osVersion: '10'
          }
        },
        {
            browserName: 'IE',
            'bstack:options': {
                browserVersion: 'latest',
                os: 'Windows',
                osVersion: '10'
          }
        },
        {
            browserName: 'Safari',
            'bstack:options': {
                browserVersion: 'latest',
                os: 'OS X',
                osVersion: 'Monterey'
          }  
        },
        {
            browserName: 'Chrome',
            'bstack:options': {
                browserVersion: 'latest',
                os: 'OS X',
                osVersion: 'Monterey'
            }
        },
        {
            browserName: 'Firefox',
            'bstack:options': {
                browserVersion: 'latest',
                os: 'Windows',
                osVersion: '11'
            }
        }
      ],

    maxInstances: 30,
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