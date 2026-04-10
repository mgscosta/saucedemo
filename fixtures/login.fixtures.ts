import { test as base } from '@playwright/test';
import { LoginPage } from '../page-objects/login-page';
import { HomePage } from '../page-objects/home-page';

type LoginFixtures = {
    login: LoginPage;
    home: HomePage;
}

export const test = base.extend<LoginFixtures>({
    login: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },
    home: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    }    
});

export { expect } from '@playwright/test';