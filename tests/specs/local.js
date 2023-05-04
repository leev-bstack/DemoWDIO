var assert = require('assert');

describe('BrowserStack', () => {
    it('show local testing console title', async () => {
        await browser.maximizeWindow()
        await browser.url(`http://bs-local.com:45454`)
        //will get title from local console
        var title = await browser.getTitle()
        assert.equal(title, 'BrowserStack Local')
    })
})
