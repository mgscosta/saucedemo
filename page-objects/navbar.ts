import { type Locator, type Page } from '@playwright/test';

export class Navbar {
    readonly page: Page;
    readonly burgerMenuButton: Locator;
    readonly goToCartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.burgerMenuButton = this.page.locator("#react-burger-menu-btn");
        this.goToCartLink = this.page.locator(".shopping_cart_link");
    }

    async clickOnMenu() {
        await this.burgerMenuButton.click();
    }

    async goToCart() {
        await this.goToCartLink.click();
    }
}