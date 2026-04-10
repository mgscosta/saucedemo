import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly burgerMenuButton: Locator;
    readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.burgerMenuButton = this.page.locator("#react-burger-menu-btn");
        this.logoutLink = this.page.locator("#logout_sidebar_link");
    }

    async goto() {
        await this.page.goto(process.env.APP_URL! + "/inventory.html");
    }

    async clickOnMenu()
    {
        await this.burgerMenuButton.click();        
    }

    async logout() {
        await this.logoutLink.click();
    }

    async validateUrl() {
        expect(this.page).toHaveURL(/inventory.html/);
    }
}