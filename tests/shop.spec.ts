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

    test('add two items to cart then remove one and proceed to checkout', async ({ login, navbar, products, cart, checkout }) => {
        await products.addItemToCart("add-to-cart-sauce-labs-backpack");
        await products.addItemToCart("add-to-cart-test.allthethings()-t-shirt-(red)");
        await navbar.goToCart();
        await cart.removeItemFromCart("remove-sauce-labs-backpack");
        await cart.clickOnCheckout();
        await checkout.fillInformationForm("John", "Doe", "12345-678");
        await checkout.clickOnContinue();
        await checkout.validateSubTotal("15.99");
        await checkout.clickOnFinish();
        await expect(checkout.completeHeader).toContainText("Thank you for your order!");
    });
});