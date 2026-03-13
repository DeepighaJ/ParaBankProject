import { Logger } from "../utils/logger";
import { test, expect } from "../fixtures/loginFixture";

Logger.info("Starting login workflow");

test("User login @smoke", async ({ loggedInPage }) => {
  // ✅ No waitForTimeout — the fixture already waits for "Accounts Overview"
  //    via loginPage.login(), so the page is ready immediately here.

  const title = await loggedInPage.title();
  Logger.info(`Page title after login: ${title}`);

  // Assert the title contains expected text
  expect(title).toContain("ParaBank");

  // Assert a key post-login element is visible
  await expect(loggedInPage.locator("text=Accounts Overview").last()).toBeVisible();
});