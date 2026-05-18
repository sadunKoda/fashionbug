import { Locator, Page } from '@playwright/test';

export class HeaderPanel {
  private profileBadge: Locator;
  private profileName: Locator;

  constructor(private page: Page) {
    this.profileBadge = page.locator('//li[contains(@class,"oxd-userdropdown")]');
    this.profileName = page.locator('//p[contains(@class,"oxd-userdropdown-name")]');
  }

  /**
   * Reads the visible user name from the header profile chip.
   * @returns Trimmed profile label text
   */
  async getProfileName(): Promise<string> {
    await this.profileName.waitFor({ state: 'visible' });
    return (await this.profileName.innerText()).trim();
  }

  /**
   * Opens the user profile dropdown in the top bar.
   * @returns this for chaining
   */
  async openProfileMenu(): Promise<this> {
    await this.profileBadge.click();
    return this;
  }
}
