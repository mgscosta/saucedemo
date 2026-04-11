import { test } from '/repos/saucedemo/fixtures/login.fixtures';

test.describe('login tests', () => {
  test('log in successfully', async ({ login, home }) => {
    await login.goto();
    await login.performLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    await home.validateUrl();
  });

  test('error loggin with wrong username', async ({ login }) => {
    await login.goto();
    await login.performLogin("wrong-user", process.env.APP_PASSWORD!);
    await login.validateErrorMessage("Epic sadface: Username and password do not match any user in this service");
  });

  test('error loggin with wrong password', async ({ login }) => {
    await login.goto();
    await login.performLogin(process.env.APP_USERNAME!, "wrong-password");
    await login.validateErrorMessage("Epic sadface: Username and password do not match any user in this service");
  });

  test('log out successfuly', async ({ login, home }) => {

    await login.goto();
    await login.performLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);

    await home.clickOnMenu();
    await home.logout();
  });

  test('fail when tries to navigate to home without logging in', async ({ login, home }) => {

    await home.goto();
    await login.validateErrorMessage("Epic sadface: You can only access '/inventory.html' when you are logged in.");
  }); 
});