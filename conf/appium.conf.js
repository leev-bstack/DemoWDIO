const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const date= new Date;
const user = process.env.BROWSERSTACK_USERNAME
const key = process.env.BROWSERSTACK_ACCESS_KEY
const appName = "WikiApp"
const appPath = './WikipediaSample.apk'

exports.config = {

    user: user,
    key: key,

    specs: [
        '../tests/specs/appium.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    services: [
      [
        'browserstack',
        {
          testObservability: true,
          testObservabilityOptions: {
            projectName: "WDIO Demo",
            buildName: "WDIO Appium demo"
          },
        app: appName || appPath
        }
      ],
    ],
    commonCapabilities: {
        'bstack:options': {
            buildName: 'WDIO Appium demo ' + date.toLocaleString(),
            projectName: 'WDIO Demo',
            networkLogs: true,
            appProfiling: true
        }
      },
    capabilities: [

        {
            'bstack:options': {
                deviceName: 'Samsung Galaxy S23',
                osVersion: '13'
            }
        },
        {
            'bstack:options': {
                deviceName: 'Google Pixel 7',
                osVersion: '13'
            }
        },
        {
            'bstack:options': {
                deviceName: 'Google Pixel 6',
                osVersion: '12'
            }
        },
        {
            'bstack:options': {
                deviceName: 'Samsung Galaxy S21 Ultra',
                osVersion: '11'
            }
        },
        {
            'bstack:options': {
                deviceName: 'OnePlus 9',
                osVersion: '11'
            }
        }
      ],

    maxInstances: 6,
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
    onPrepare: async function (config, capabilities) {
        await uploadApp();
    },
}
exports.config.capabilities.forEach(function (caps) {
    for (var i in exports.config.commonCapabilities)
      caps[i] = { ...caps[i], ...exports.config.commonCapabilities[i]};
  });
  async function uploadApp(){
    console.log('Checking if app is uploaded')
    const request = {
        method: 'GET',
        url: 'https://api-cloud.browserstack.com/app-automate/recent_apps/' + appName,
        headers: {
          'Authorization': `Basic ${btoa(`${user}:${key}`)}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await axios(request);
      if (response.status === 200) {
        const data = response.data
        if (data.hasOwnProperty('message')){
            console.log('message is '+ response.data.message)
            // There is no app called WikiApp, so upload it
            console.log('There is no app called WikiApp, so uploading it')
            var form = new FormData();
            const file = await fs.createReadStream(appPath);
            form.append('custom_id', appName);
            form.append('file', file)
            const uploadRequest = {
              method: 'POST',
              url: 'https://api-cloud.browserstack.com/app-automate/upload',
              headers: {
                'Authorization': `Basic ${btoa(`${user}:${key}`)}`,
                'Content-Type': 'multipart/form-data',
                ...form.getHeaders()
              },
              data : form
            }
            const uploadResponse = await axios(uploadRequest);
            if (uploadResponse.status === 200) {
              console.log(appName + ' is now uploded');
            } else {
              console.log(`App upload failed with status code ${uploadResponse.status}`);
            }
          } else console.log('app is uploaded already with name ' + appName);
        } else {
          // The request failed, so print an error message
          console.log(`List Uploaded Apps Request failed with status code ${response.status}`);
        }
    }