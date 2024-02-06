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
            'browserstack',   {
                accessibility: true,
                accessibilityOptions: {
                  wcagVersion: "wcag21a",
                  includeIssueType: {
                    bestPractice: false,
                    needsReview: true,
                    },
                }
            }
        ],
    ],
    commonCapabilities: {
        'bstack:options': {
            buildName: 'WDIO a11y demo ' + date.toLocaleString(),
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