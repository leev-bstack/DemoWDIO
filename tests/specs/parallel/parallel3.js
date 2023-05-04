
describe("Testing with Bstackdemo", () => {
    it("add product to cart", async () => {
      await browser.url("https://bstackdemo.com/");
      await browser.waitUntil(
        async () => (await browser.getTitle()).match(/StackDemo/i),
        5000,
        "Title didn't match with BrowserStack"
      );
  
      const productOnScreen = await $('//*[@id="1"]/p');
      const productOnScreenText = await productOnScreen.getText();
  
      const addToCart = await $('//*[@id="1"]/div[4]');
      await addToCart.click();
  
      const productInCart = await $('.float-cart__content .title');
  
      await browser.waitUntil(async () => (
        await productInCart.getText()).match(productOnScreenText), 
        { timeout: 5000 }
      );
    });
  });