import { test } from "@playwright/test";
import RegisterPage, { RegistrationData } from "../pages/RegisterPage";
import rawData from "../test-data/registerData.json";

// ── Environment variables (set in .env / Login.env) ───────────────────────
const BASE_URL =  process.env.PARABANK_URL as string;

// ── Helper: replace {{timestamp}} for unique usernames per run ────────────
function resolveData(data: RegistrationData): RegistrationData {
  const randomValue = Math.floor(Math.random() * 90000) + 10000; // 5-digit random
  const ts = Date.now();

  return {
    ...data,
    username: data.username.replace("{{timestamp}}", String(ts)),
   
  };
}

// ── Shared setup ──────────────────────────────────────────────────────────
test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

// ══════════════════════════════════════════════════════════════════════════
// TC-REG-01 | New user registers successfully
// ══════════════════════════════════════════════════════════════════════════
test(
  "TC-REG-01: New user registration should succeed @smoke @registration",
  async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const data = resolveData(rawData.newUser as RegistrationData);

    await registerPage.fillRegistrationForm(data);
    await registerPage.verifyRegistrationSuccess();
  }
);

// ══════════════════════════════════════════════════════════════════════════
// TC-REG-02 | Existing username shows duplicate-user error
// ══════════════════════════════════════════════════════════════════════════
test(
  "TC-REG-02: Registration with existing username should show error @smoke @registration",
  async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const data = resolveData(rawData.existingUser as RegistrationData);

    await registerPage.fillRegistrationForm(data);
    await registerPage.verifyUserAlreadyExists();
  }
);

// ══════════════════════════════════════════════════════════════════════════
// TC-REG-03 | Mismatched passwords show validation error
// ══════════════════════════════════════════════════════════════════════════
test(
  "TC-REG-03: Registration with mismatched passwords should show error @registration",
  async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const data = resolveData(rawData.passwordMismatch as RegistrationData);

    await registerPage.fillRegistrationForm(data);
    await registerPage.verifyPasswordMismatch();
  }
);

// ══════════════════════════════════════════════════════════════════════════
// TC-REG-04 | Submitting blank form shows required-field errors
// ══════════════════════════════════════════════════════════════════════════
test(
  "TC-REG-04: Submitting empty registration form should show required field errors @registration",
  async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.clickRegister();
    await registerPage.clickRegisterButton();
    await registerPage.verifyRequiredFieldErrors();
  }
);