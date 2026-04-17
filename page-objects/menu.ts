import { type Locator, type Page } from '@playwright/test';

export class Menu {
    readonly page : Page;
    readonly inventoryLink: Locator;
    readonly aboutLink: Locator;
    readonly logoutLink: Locator;
    readonly resetAppStateLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryLink = this.page.locator("#inventory_sidebar_link");
        this.aboutLink = this.page.locator("#about_sidebar_link");
        this.logoutLink = this.page.locator("#logout_sidebar_link");        
        this.resetAppStateLink = this.page.locator("#reset_sidebar_link");        
    }

    async logout() {
        await this.logoutLink.click();
    }
}