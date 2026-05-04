import {  expect, type Locator, type Page } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly zipCodeInput: Locator;
    readonly cancelButton: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly completeHeader: Locator;
    readonly subTotalLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = this.page.locator("#first-name");
        this.lastNameInput = this.page.locator("#last-name");
        this.zipCodeInput = this.page.locator("#postal-code");
        this.cancelButton = this.page.locator("#cancel");
        this.continueButton = this.page.locator("#continue");
        this.finishButton = this.page.locator("#finish");
        this.completeHeader = this.page.locator(".complete-header");
        this.subTotalLabel = this.page.locator(".summary_subtotal_label");
    }

    async fillInformationForm(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
    }
    
    async clickOnCancel() {
        await this.cancelButton.click();
    }

    async clickOnContinue() {
        await this.continueButton.click();
    }

    async clickOnFinish() {
        await this.finishButton.click();
    } 

    async validateSubTotal(text: string) {
        await expect(this.subTotalLabel).toHaveText(`Item total: \$${text}`);
    }
}