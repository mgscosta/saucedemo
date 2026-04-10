import { test, expect } from '@playwright/test';

test('login successfully', async ({ page }) => {
  await page.goto(process.env.APP_URL!);

  await page.locator("#user-name").fill(process.env.APP_USERNAME!);
  await page.locator("#password").fill(process.env.APP_PASSWORD!);

  await page.locator("#login-button").click();

  expect(page).toHaveURL(/inventory/);
});