import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { HomePage } from '../page-objects/home-page';

type HomeFixtures = {
    login: LoginPage;
    home: HomePage;
}

export const test = base.extend<HomeFixtures>({
    login: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.performLogin(process.env.APP_USERNAME, process.env.APP_PASSWORD);
        await use(loginPage);
    },
    home: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.validateUrl();
        await use(homePage);
    }    
});

export { expect } from '@playwright/test';