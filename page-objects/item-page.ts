import { expect, type Locator, type Page } from '@playwright/test';

export class ItemPage {
    readonly page: Page;
    readonly name: Locator;
    readonly description: Locator;
    readonly price: Locator;
    readonly addToCartButton: Locator;
    readonly removeFromCartButton: Locator;
    readonly image: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = this.page.getByTestId("inventory-item-name");
        this.description = this.page.getByTestId("inventory-item-desc");
        this.price = this.page.getByTestId("inventory-item-price");
        this.addToCartButton = this.page.getByTestId("add-to-cart");
        this.removeFromCartButton = this.page.getByTestId("remove");
        this.image = this.page.locator(".inventory_details_img");
    }

    async validateItemName(name: string) {
        expect(await this.name).toHaveText(name);        
    }

    async validateItemDescription(desc: string) {
        expect(await this.description).toHaveText(desc);
    }

    async validateItemPrice(price: string) {
        expect(await this.price).toHaveText(price);
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async removeFromCart() {
        await this.removeFromCartButton.click();
    }

    async validateImageAlt(altText: string) {
        expect(await this.image).toHaveAttribute("alt", altText);
    }
}