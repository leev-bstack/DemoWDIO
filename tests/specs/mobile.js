var assert = require('assert');

describe('BrowserStack', () => {
    it('Check page title', async () => {
        await browser.url(`https://www.browserstack.com`)
        var title = await browser.getTitle()
        assert.equal(title, title)
    })
})
