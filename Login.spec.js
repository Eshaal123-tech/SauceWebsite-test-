const { test, expect } = require('@playwright/test');
const { LoginPageLocators } = require('./locators');

// login valid test case
test('Login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill(LoginPageLocators.usernameField, 'standard_user');
  await page.fill(LoginPageLocators.passwordField, 'secret_sauce');
  await page.click(LoginPageLocators.loginButton);

  // Wait for navigation
  await expect(page).toHaveURL(/.*inventory/);
  await expect(page.locator('.inventory_list')).toBeVisible();
});

//invalid login test case 
test('Login with invalid credentials should show error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.fill(LoginPageLocators.usernameField, 'invalid_user');
  await page.fill(LoginPageLocators.passwordField, 'wrong_password');
  await page.click(LoginPageLocators.loginButton);

  const errorMsg = page.locator('[data-test="error"]');
  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toContainText('Username and password do not match');
});
