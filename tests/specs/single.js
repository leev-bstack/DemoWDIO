const { Key } = require('webdriverio')

describe('BrowserStack', () => {
    it('should search for Data Centers', async () => {
        //go to Google
        await browser.maximizeWindow()
        await browser.url(`https://www.google.com`)
        //search for browserstack
        await $('[name="q"]').setValue('BrowserStack');
        await browser.keys([Key.Return])
        //click on correct result
        await $('//*[@href="https://www.browserstack.com/"]/div').click()
        //wait until page title is correct    
        await browser.waitUntil(async function () {
            return (await this.getTitle()) == 'Most Reliable App & Cross Browser Testing Platform | BrowserStack'
        }, {timeout: 10000}
        )
    })
})

