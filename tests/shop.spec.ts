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

    test('validate cart badge count by adding and removing items', async ({ login, navbar, products, cart, checkout }) => {
        await products.addItemToCart("add-to-cart-sauce-labs-backpack");
        await navbar.validateBadgeCount("1");
        await products.addItemToCart("add-to-cart-sauce-labs-bike-light");
        await navbar.validateBadgeCount("2");
        await products.addItemToCart("add-to-cart-sauce-labs-bolt-t-shirt");
        await navbar.validateBadgeCount("3");
        await products.addItemToCart("add-to-cart-sauce-labs-fleece-jacket");
        await navbar.validateBadgeCount("4");
        await products.addItemToCart("add-to-cart-sauce-labs-onesie");
        await navbar.validateBadgeCount("5");
        await products.addItemToCart("add-to-cart-test.allthethings()-t-shirt-(red)");
        await navbar.validateBadgeCount("6");
        
        await products.removeItemFromCart("remove-sauce-labs-backpack");
        await navbar.validateBadgeCount("5");
        await products.removeItemFromCart("remove-sauce-labs-bike-light");
        await navbar.validateBadgeCount("4");
        await products.removeItemFromCart("remove-sauce-labs-bolt-t-shirt");
        await navbar.validateBadgeCount("3");
        await products.removeItemFromCart("remove-sauce-labs-fleece-jacket");
        await navbar.validateBadgeCount("2");
        await products.removeItemFromCart("remove-sauce-labs-onesie");
        await navbar.validateBadgeCount("1");
        await products.removeItemFromCart("remove-test.allthethings()-t-shirt-(red)");
        await navbar.validateBadgeExistence(false);
    });
});