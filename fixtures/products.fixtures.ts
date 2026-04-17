import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { ProductsPage } from '../page-objects/products-page';

type ProductsFixtures = {
    login: LoginPage;
    products: ProductsPage;
}

export const test = base.extend<ProductsFixtures>({
    login: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.performLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
        await use(loginPage);
    },
    products: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await productsPage.validateUrl();
        await use(productsPage);
    }    
});

export { expect } from '@playwright/test';