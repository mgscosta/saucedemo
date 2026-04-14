import { expect, test } from '/repos/saucedemo/fixtures/home.fixtures';

test.describe('shop tests', () => {
    test('buy an item from the shop', async ({ login, home }) => {
        await home.addItemToCart("#add-to-cart-sauce-labs-backpack");
        await home.goToCart();
        await home.clickOnButtonByText("Checkout");
        await home.fillInformationForm("John", "Doe", "12345-678");
        await home.clickOnButtonByText("Continue");
        await home.clickOnButtonByText("Finish");
        await expect(home.completeHeader).toContainText("Thank you for your order!");
    });
});