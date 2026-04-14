import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly burgerMenuButton: Locator;
    readonly logoutLink: Locator;
    readonly goToCartLink: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly completeHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.burgerMenuButton = this.page.locator("#react-burger-menu-btn");
        this.logoutLink = this.page.locator("#logout_sidebar_link");
        this.goToCartLink = this.page.locator(".shopping_cart_link");
        this.firstNameInput = this.page.locator("#first-name");
        this.lastNameInput = this.page.locator("#last-name");
        this.zipCodeInput = this.page.locator("#postal-code");
        this.completeHeader = this.page.locator(".complete-header");
    }

    async goto() {
        await this.page.goto(process.env.APP_URL! + "/inventory.html");
    }

    async clickOnMenu() {
        await this.burgerMenuButton.click();
    }

    async logout() {
        await this.logoutLink.click();
    }

    async validateUrl() {
        await expect(this.page).toHaveURL(/inventory.html/);
    }

    async addItemToCart(itemLocator: string) {
        await this.page.locator(itemLocator).click();
    }

    async goToCart() {
        await this.goToCartLink.click();
    }

    async clickOnButtonByText(text: string) {
        await this.page.getByText(text).click();
    }
    
    async fillInformationForm(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }
}