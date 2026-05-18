import { test } from '../src/config/page.config';
import { dashboardExpected as expected, users } from '../src/config/page-loader';

test.describe('OrangeHRM opensource demo - dashboard', () => {
  test('should show primary productivity widgets after login', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.step_waitForRoute();
    await dashboardPage.verify_onDashboard();
    await dashboardPage.verify_pageTitle(expected.labels.pageTitle);
    await dashboardPage.verify_dashboardTitleMatches(expected.labels.dashboardTitle);
    await dashboardPage.verify_timeAtWorkWidgetVisible();
    await dashboardPage.verify_myActionsWidgetVisible();
  });

  test('should show launch shortcuts and org chart widgets after login', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.step_waitForRoute();
    await dashboardPage.verify_quickLaunchWidgetVisible();
    await dashboardPage.verify_employeeDistributionBySubUnitVisible();
  });

  test('should show Dashboard as the in-app screen title after login', async ({ loginPage, dashboardPage }) => {
    await loginPage.step_navigate();
    await loginPage.step_login(users.admin);
    await dashboardPage.step_waitForRoute();
    await dashboardPage.verify_dashboardTitleMatches(expected.labels.dashboardTitle);
  });
});
