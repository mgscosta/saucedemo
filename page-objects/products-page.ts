import { expect, type Locator, type Page } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly sortSelect: Locator;
    readonly inventoryItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sortSelect = this.page.getByTestId("product-sort-container");
        this.inventoryItem = this.page.getByTestId("inventory-item");
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

    async sortByOption(option: string) {
        await this.sortSelect.selectOption(option);
    }

    async validateSort(values: string[]) {
        let sortedValues: string[] = values.sort();

        let isEqual: boolean;

        isEqual = sortedValues.length === values.length &&
            sortedValues.every((val, index) => val === values[index]);

        return isEqual;
    }

    async obtainInventoryList() {
        let inventoryItemList : string [] = await this.inventoryItem.allTextContents();

        return inventoryItemList;
    }
}