import { expect, test } from '/repos/saucedemo/fixtures/shop.fixtures';

test.describe('shop tests', () => {
    test('buy an item from the shop', async ({ login, navbar, products, cart, checkout}) => {
        await products.addItemToCart("#add-to-cart-sauce-labs-backpack");
        await navbar.goToCart();
        await cart.clickOnCheckout();
        await checkout.fillInformationForm("John", "Doe", "12345-678");
        await checkout.clickOnContinue();
        await checkout.clickOnFinish();
        await expect(checkout.completeHeader).toContainText("Thank you for your order!");
    });
});