import { test, expect } from '@playwright/test';
import { LoginPage } from '/repos/saucedemo/page-objects/login-page';
import { HomePage } from '/repos/saucedemo/page-objects/home-page';

test('log in successfully', async ({ page }) => {

  const login = new LoginPage(page);

  await login.goto();
  await login.performLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

  expect(page).toHaveURL(/inventory/);
});

test('error loggin with wrong username', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.performLogin("wrong-user", process.env.APP_PASSWORD!);
  await login.validateErrorMessage("Epic sadface: Username and password do not match any user in this service");
});

test('error loggin with wrong password', async ({ page }) => {
  const login = new LoginPage(page);

  await login.goto();
  await login.performLogin(process.env.APP_USERNAME!, "wrong-password");
  await login.validateErrorMessage("Epic sadface: Username and password do not match any user in this service");
});

test('log out successfuly', async ({ page }) => {
  const login = new LoginPage(page);
  const home = new HomePage(page);

  await login.goto();
  await login.performLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

  await home.clickOnMenu();
  await home.logout();
});

test('fail when tries to navigate to home without logging in', async ({ page }) => {
  const login = new LoginPage(page);
  const home = new HomePage(page);

  await home.goto();
  await login.validateErrorMessage("Epic sadface: You can only access '/inventory.html' when you are logged in.");
}); 
