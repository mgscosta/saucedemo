import { type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = this.page.locator("#checkout");
    }

    async clickOnCheckout()
    {
        await this.checkoutButton.click();
    }
}