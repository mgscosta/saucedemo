import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("#user-name");
        this.passwordInput = page.locator("#password");
        this.signInButton = page.locator("#login-button")
    }

    async goto() {
        await this.page.goto(process.env.APP_URL!);
    }

    async performLogin(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }
}

