import { expect, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class DashboardPage extends BasePage {
  private dashboardBannerHeading = this.page.locator('//header//h6[normalize-space()="Dashboard"]');
  private employeeDistributionSubUnitTitle = this.page.locator('//p[normalize-space()="Employee Distribution by Sub Unit"]');
  private myActionsTitle = this.page.locator('//p[normalize-space()="My Actions"]');
  private quickLaunchTitle = this.page.locator('//p[normalize-space()="Quick Launch"]');
  private timeAtWorkTitle = this.page.locator('//p[normalize-space()="Time at Work"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Waits for the post-login dashboard URL after authentication.
   * @returns this for chaining
   */
  async step_waitForRoute(): Promise<this> {
    await this.page.waitForURL(/\/web\/index\.php\/dashboard\/index/, { timeout: 15_000 });
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Confirms the browser is on the OrangeHRM dashboard route.
   * @returns this for chaining
   */
  async verify_onDashboard(): Promise<this> {
    await expect(this.page).toHaveURL(/\/web\/index\.php\/dashboard\/index/);
    return this;
  }

  /**
   * Verifies the document title contains the expected substring.
   * @param expectedSubstring - Text expected in the page title
   * @returns this for chaining
   */
  async verify_pageTitle(expectedSubstring: string): Promise<this> {
    await expect(this.page).toHaveTitle(new RegExp(expectedSubstring, 'i'));
    return this;
  }

  /**
   * Verifies the in-app main screen title matches the expected label.
   * @param expectedTitle - Exact text shown in the header dashboard title
   * @returns this for chaining
   */
  async verify_dashboardTitleMatches(expectedTitle: string): Promise<this> {
    await this.dashboardBannerHeading.waitFor({ state: 'visible' });
    expect((await this.dashboardBannerHeading.innerText()).trim()).toBe(expectedTitle);
    return this;
  }

  /**
   * Verifies the Time at Work dashboard card heading is visible.
   * @returns this for chaining
   */
  async verify_timeAtWorkWidgetVisible(): Promise<this> {
    await this.waitForElement(this.timeAtWorkTitle);
    return this;
  }

  /**
   * Verifies the My Actions dashboard card heading is visible.
   * @returns this for chaining
   */
  async verify_myActionsWidgetVisible(): Promise<this> {
    await this.waitForElement(this.myActionsTitle);
    return this;
  }

  /**
   * Verifies the Quick Launch dashboard card heading is visible.
   * @returns this for chaining
   */
  async verify_quickLaunchWidgetVisible(): Promise<this> {
    await this.waitForElement(this.quickLaunchTitle);
    return this;
  }

  /**
   * Verifies the Employee Distribution by Sub Unit card heading is visible.
   * @returns this for chaining
   */
  async verify_employeeDistributionBySubUnitVisible(): Promise<this> {
    await this.waitForElement(this.employeeDistributionSubUnitTitle);
    return this;
  }
}
