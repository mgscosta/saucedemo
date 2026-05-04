import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
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

    async clickOnButtonByText(text: string) {
        await this.page.getByText(text).click();
    }

    async removeItemFromCart(itemTestId: string) {
        await this.page.getByTestId(itemTestId).click();
    }
}