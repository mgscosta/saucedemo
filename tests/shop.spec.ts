import { expect, test } from '/repos/saucedemo/fixtures/products.fixtures';

test.describe('shop tests', () => {
    test('buy an item from the shop', async ({ login, products }) => {
        await products.addItemToCart("#add-to-cart-sauce-labs-backpack");
        await products.goToCart();
        await products.clickOnButtonByText("Checkout");
        await products.fillInformationForm("John", "Doe", "12345-678");
        await products.clickOnButtonByText("Continue");
        await products.clickOnButtonByText("Finish");
        await expect(products.completeHeader).toContainText("Thank you for your order!");
    });
});