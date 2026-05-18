import { expect, type Locator, type Page } from '@playwright/test';
import { SortingOrder } from '../enums/sorting-order';

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

    async validateSortByName(values: Locator[], sortingOrder: SortingOrder) {
        let namesArray: Locator[] = values.map(element => {
            return element.getByTestId("inventory-item-name");
        });

        let names: (string | null)[] = await Promise.all(namesArray.map(async element => {
            return await element.textContent();
        }));

        let copy: (string | null)[] = [...names];


        let sortedValues: (string | null)[];

        switch (sortingOrder) {
            case SortingOrder.Ascending:
                sortedValues = copy.sort();
                break;
            case SortingOrder.Descending:
                sortedValues = copy.sort((a, b) => b!.localeCompare(a!));
                break;
        }

        let isEqual: boolean;

        isEqual = sortedValues.length === values.length &&
            sortedValues.every((val, index) => val === names[index]);

        expect(isEqual).toBe(true);
    }

    async validateSortByPrice(values: Locator[], sortingOrder: SortingOrder) {
        let pricesArray: Locator[] = values.map(element => {
            return element.getByTestId("inventory-item-price");
        });

        let prices: (string | null)[] = await Promise.all(pricesArray.map(async element => {
            return await element.textContent();
        }));

        let pricesNumberArray: number[] = prices.filter((x): x is string => x !== null).map(element => {
            return Number(element.replace("$", ""));
        });

        let copy: number[] = [...pricesNumberArray];

        let sortedValues: number[];

        switch (sortingOrder) {
            case SortingOrder.Ascending:
                sortedValues = copy.sort((a, b) => a - b);
                break;
            case SortingOrder.Descending:
                sortedValues = copy.sort((a, b) => b - a);
                break;
        }

        let isEqual: boolean;

        isEqual = sortedValues.length === values.length &&
            sortedValues.every((val, index) => val === pricesNumberArray[index]);

        expect(isEqual).toBe(true);
    }

    async obtainInventoryList() {
        let inventoryItemList: Locator[] = await this.inventoryItem.all();

        return inventoryItemList;
    }
}