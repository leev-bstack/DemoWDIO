var assert = require('assert')

describe('BrowserStack', () => {
    it('search Google', async () => {
        await browser.url('https://www.google.com')
        await $('[name="q"]').setValue('browserstsack')
        await browser.keys("Enter")
        const title = await browser.getTitle()
        assert.equal(title, title)
    })
})