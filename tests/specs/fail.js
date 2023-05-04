var assert = require('assert');

describe('BrowserStack', () => {
    it('should fail', async () => {
        await browser.maximizeWindow()
        await browser.url(`https://www.browserstack.com`)
        //title does not match
        var title = await browser.getTitle()
        assert.equal(title, 'Wrong Title')
    })
})
