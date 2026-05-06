import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly sortSelect : Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortSelect = this.page.getByTestId("product-sort-container");
    }

    async goto() {
        await this.page.goto(process.env.APP_URL! + "/inventory.html");
    }

    async validateUrl() {
        await expect(this.page).toHaveURL(/inventory.html/);
    }

    async addItemToCart(itemTestId: string) {
        await this.page.getByTestId(itemTestId).click();
    }

    async removeItemFromCart(itemTestId: string) {
        await this.page.getByTestId(itemTestId).click();
    }

    async clickToViewItem(itemName: string) {
        await this.page.getByText(itemName).click();
    }
}