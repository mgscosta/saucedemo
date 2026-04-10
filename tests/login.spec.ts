import { test, expect } from '@playwright/test';
import { LoginPage } from '/repos/saucedemo/page-objects/login-page';

test('login successfully', async ({ page }) => {
  
  const login = new LoginPage(page);
  
  await login.goto();
  await login.performLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD! );
  
  expect(page).toHaveURL(/inventory/);
});