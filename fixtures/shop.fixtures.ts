import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { ProductsPage } from '../page-objects/products-page';
import { Menu } from '../page-objects/menu';
import { Navbar } from '../page-objects/navbar';
import { CheckoutPage } from '../page-objects/checkout-page';
import { CartPage } from '../page-objects/cart-page';
import { ItemPage } from '../page-objects/item-page';

type ShopFixtures = {
    login: LoginPage;
    navbar: Navbar;
    menu: Menu;
    products: ProductsPage;
    cart: CartPage;
    checkout: CheckoutPage;
    item: ItemPage;
}

export const test = base.extend<ShopFixtures>({
    login: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.performLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
        await use(loginPage);
    },
    navbar: async ({ page }, use) => {
        const navBar = new Navbar(page);
        await use(navBar);
    },
    menu: async ({ page }, use) => {
        const menu = new Menu(page);
        await use(menu);
    },
    products: async ({ page, login }, use) => {
        const productsPage = new ProductsPage(page);
        await productsPage.validateUrl();
        await use(productsPage);
    },
    cart: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
    checkout: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
    item: async ({ page }, use) => {
        const itemPage = new ItemPage(page);
        await use(itemPage);
    }
});

export { expect } from '@playwright/test';