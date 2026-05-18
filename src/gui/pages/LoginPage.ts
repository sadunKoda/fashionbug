import { expect, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export type LoginCredentials = { username: string; password: string };

export class LoginPage extends BasePage {
  readonly path = '/web/index.php/auth/login';

  private usernameInput = this.page.locator('//input[@name="username"]');
  private passwordInput = this.page.locator('//input[@name="password"]');
  private loginButton = this.page.locator('//button[@type="submit"]');
  private usernameFieldError = this.page.locator(
    '//input[@name="username"]/parent::div/following-sibling::span[contains(@class,"oxd-input-field-error-message")]',
  );
  private errorMessage = this.page.locator('//div[@role="alert"]');

  constructor(page: Page) {
    super(page);
  }

  /**
   * Opens the OrangeHRM login screen and waits for DOM readiness.
   * @returns this for chaining
   */
  async step_navigate(): Promise<this> {
    await this.page.goto(this.path, { waitUntil: 'domcontentloaded', timeout: 45_000 });
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Enters credentials and submits the login form.
   * @param credentials - Username and password for OrangeHRM
   * @returns this for chaining
   */
  async step_login(credentials: LoginCredentials): Promise<this> {
    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
    await this.waitForPageLoad();
    return this;
  }

  /**
   * Asserts the credential error banner shows the expected copy.
   * @param expectedText - Substring expected in the alert region
   * @returns this for chaining
   */
  async verify_errorMessage(expectedText: string): Promise<this> {
    await this.errorMessage.waitFor({ state: 'visible' });
    expect((await this.errorMessage.innerText()).trim()).toContain(expectedText);
    return this;
  }

  /**
   * Asserts the username row shows the inline required-field message.
   * @param expectedText - Exact or leading copy from the field error span
   * @returns this for chaining
   */
  async verify_usernameRequiredMessage(expectedText: string): Promise<this> {
    await this.usernameFieldError.waitFor({ state: 'visible' });
    expect((await this.usernameFieldError.innerText()).trim()).toContain(expectedText);
    return this;
  }

  /**
   * Confirms the password field uses a masked input type.
   * @returns this for chaining
   */
  async verify_passwordFieldIsMasked(): Promise<this> {
    await this.passwordInput.waitFor({ state: 'visible' });
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
    return this;
  }
}
