describe('BrowserStack', () => {
    it('should search for Data Centers', async () => {
        await browser.maximizeWindow()
        await browser.url(`https://www.browserstack.com`)
        //search for datacenters
        await $('//li[@class="hide-sm hide-xs"]').click()
        await $('[name="query"]').setValue('Data Centers')
        await $('.ds__input__handle--submit').click()
        //click on correct result
        await $('//*[@href="https://www.browserstack.com/data-centers"]').click()
        //close old window and switch to new
        await browser.closeWindow()
        const handles = await browser.getWindowHandles()
        await browser.switchToWindow(handles[0])
        //wait until page title is correct    
        await browser.waitUntil(async function () {
            return (await this.getTitle()) == 'Global Data Centers | BrowserStack'
        }, {timeout: 10000}
        )
    })
})

