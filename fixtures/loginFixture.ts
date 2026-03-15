import { test as base, Page } from "@playwright/test";
import LoginPage from "../pages/LoginPage";
export { expect } from "@playwright/test";

// ── Credentials — loaded from Login.env locally, GitHub Secrets on CI ─────
const BASE_URL = process.env.PARABANK_URL!;
const USERNAME = process.env.PARABANK_USERNAME!;
const PASSWORD = process.env.PARABANK_PASSWORD!;

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
    // `login()` encapsulates credentials + post-login wait
    await loginPage.login(USERNAME, PASSWORD);

    await use(page);
  },
});

