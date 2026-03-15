import { expect } from "@playwright/test";
import BasePage from "./BasePage";

/**
 * LoginPage — handles all login-related interactions.
 * Extends BasePage for shared `page` access and common utilities.
 */
export default class LoginPage extends BasePage {

  // ─── Login Actions ─────────────────────────────────────────────────────────

  async enterUsername(username: string): Promise<void> {
    await this.page.fill("input[name='username']", username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill("input[name='password']", password);
  }

  async clickLogin(): Promise<void> {
    await this.page.click("input[value='Log In']");
  }

  /**
   * Compound method: fills credentials, clicks Log In,
   * and waits for the post-login dashboard to appear.
   */
  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
   // await this.page.waitForSelector("text=Accounts Overview", { timeout: 10_000 });
  }

  // ─── Assertions ────────────────────────────────────────────────────────────

  async verifyLoginSuccess(): Promise<void> {
    await expect(
      this.page.locator("text=Accounts Overview")
    ).toBeVisible({ timeout: 10_000 });
  }

  async verifyLoginFailure(): Promise<void> {
    await expect(
      this.page.locator("text=The username and password could not be verified.")
    ).toBeVisible({ timeout: 10_000 });
  }
}