import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { ProductsPage } from '../page-objects/products-page';

type LoginFixtures = {
    login: LoginPage;
    products: ProductsPage;
}

export const test = base.extend<LoginFixtures>({
    login: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    products: async ({ page }, use) => {
        const productsPage = new ProductsPage(page);
        await use(productsPage);
    }    
});

export { expect } from '@playwright/test';