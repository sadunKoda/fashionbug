import { test } from '../src/config/page.config';
import { loginExpected as expected, users } from '../src/config/page-loader';

test.describe('OrangeHRM opensource demo - login', () => {
  test('should land on the dashboard after valid login', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.step_waitForRoute();
    await dashboardPage.verify_onDashboard();
    await dashboardPage.verify_pageTitle(expected.labels.pageTitle);
  });

  test('should reject invalid and empty credentials', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.invalid);
    await loginPage.verify_errorMessage(expected.errors.invalidCredentials);
    await loginPage.step_login(users.empty);
    await loginPage.verify_usernameRequiredMessage(expected.errors.requiredField);
  });

  test('should mask the password field on the login form', async ({ loginPage }) => {
    await loginPage.step_navigate();
    await loginPage.verify_passwordFieldIsMasked();
  });
});
