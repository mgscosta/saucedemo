import { test, expect } from '@playwright/test';
import { LoginPage } from '/repos/saucedemo/page-objects/login-page';
import { HomePage } from '/repos/saucedemo/page-objects/home-page';


test.describe('login tests', () => {
  let login: LoginPage;
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page);
    home = new HomePage(page);

  });

  test('log in successfully', async () => {
    await login.goto();
    await login.performLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    await home.validateUrl();
  });

  test('error loggin with wrong username', async () => {
    await login.goto();
    await login.performLogin("wrong-user", process.env.APP_PASSWORD!);
    await login.validateErrorMessage("Epic sadface: Username and password do not match any user in this service");
  });

  test('error loggin with wrong password', async () => {
    await login.goto();
    await login.performLogin(process.env.APP_USERNAME!, "wrong-password");
    await login.validateErrorMessage("Epic sadface: Username and password do not match any user in this service");
  });

  test('log out successfuly', async () => {

    await login.goto();
    await login.performLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    await home.clickOnMenu();
    await home.logout();
  });

  test('fail when tries to navigate to home without logging in', async () => {

    await home.goto();
    await login.validateErrorMessage("Epic sadface: You can only access '/inventory.html' when you are logged in.");
  }); 
});