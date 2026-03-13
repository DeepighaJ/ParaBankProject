import { test as base, Page } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
export { expect } from "@playwright/test";

// ── Credentials ────────────────────────────────────────────────────────────
// Prefer environment variables so secrets stay out of source control.
// Fall back to defaults only for local dev convenience.
const BASE_URL =
  process.env.PARABANK_URL as string;
const USERNAME = process.env.PARABANK_USERNAME as string;
const PASSWORD = process.env.PARABANK_PASSWORD as string;

// ── Fixture types ──────────────────────────────────────────────────────────
type MyFixtures = {
  /** A Playwright Page that is already authenticated into Parabank. */
  loggedInPage: Page;
};

// ── Extended test object ───────────────────────────────────────────────────
export const test = base.extend<MyFixtures>({
  loggedInPage: async ({ page }: { page: Page }, use: (page: Page) => Promise<void>) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto(BASE_URL);
    // `login()` encapsulates credentials + post-login wait (no magic timeouts)
    await loginPage.login(USERNAME, PASSWORD);

    await use(page);
  },
});

