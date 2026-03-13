import { Page, Locator } from "@playwright/test";

/**
 * BasePage — the root of all Page Object classes.
 *
 * `page` is declared `protected` so every subclass can access
 * `this.page` directly without any getter boilerplate.
 *
 * Never instantiate BasePage directly — always use a concrete page class.
 */
export default abstract class BasePage {
  constructor(protected page: Page) {}

  // ─── Common Navigation ─────────────────────────────────────────────────────

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  // ─── Common Utilities ──────────────────────────────────────────────────────

  async waitForElement(selector: string, timeout = 10_000): Promise<void> {
    await this.page.waitForSelector(selector, { timeout });
  }

  async isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }
}