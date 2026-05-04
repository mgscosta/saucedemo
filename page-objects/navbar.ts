import { expect, type Locator, type Page } from '@playwright/test';

export class Navbar {
    readonly page: Page;
    readonly burgerMenuButton: Locator;
    readonly goToCartLink: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.burgerMenuButton = this.page.locator("#react-burger-menu-btn");
        this.goToCartLink = this.page.locator(".shopping_cart_link");
        this.shoppingCartBadge = this.page.getByTestId("shopping-cart-badge");
    }

    async clickOnMenu() {
        await this.burgerMenuButton.click();
    }

    async goToCart() {
        await this.goToCartLink.click();
    }

    async validateBadgeCount(count: string) {
        expect(await this.shoppingCartBadge).toHaveText(count);
    }

    async validateBadgeExistence(value: boolean) {
        if (value) {
            expect(await this.shoppingCartBadge).toBeVisible();
        }
        else {
            expect(await this.shoppingCartBadge).not.toBeAttached();
        }
    }
}