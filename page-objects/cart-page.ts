import { type Locator, type Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly continueShoppingButton: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = this.page.locator("#checkout");
        this.continueShoppingButton = this.page.locator("#continue-shopping");
    }

    async clickOnCheckout()
    {
        await this.checkoutButton.click();
    }
}