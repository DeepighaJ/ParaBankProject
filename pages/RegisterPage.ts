import { expect } from "@playwright/test";
import BasePage from "./BasePage";

export interface RegistrationData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  ssn: string;
  username: string;
  password: string;
  confirmPassword: string;
}

/**
 * RegisterPage — handles all registration-related interactions.
 * Extends BasePage for shared `page` access and common utilities.
 *
 * Note: RegisterPage is NOT a LoginPage — it independently extends
 * BasePage so it only carries registration responsibility.
 */
export default class RegisterPage extends BasePage {

  // ─── Navigation ────────────────────────────────────────────────────────────

  async clickRegister(): Promise<void> {
    await this.page.locator("//a[text()='Register']").click();
  }

  // ─── Form Fields ───────────────────────────────────────────────────────────

  async enterFirstName(firstName: string): Promise<void> {
    await this.page.locator("#customer\\.firstName").fill(firstName);
  }

  async enterLastName(lastName: string): Promise<void> {
    await this.page.locator("#customer\\.lastName").fill(lastName);
  }

  async enterAddress(address: string): Promise<void> {
    await this.page.locator("#customer\\.address\\.street").fill(address);
  }

  async enterCity(city: string): Promise<void> {
    await this.page.locator("#customer\\.address\\.city").fill(city);
  }

  async enterState(state: string): Promise<void> {
    await this.page.locator("#customer\\.address\\.state").fill(state);
  }

  async enterZipCode(zipCode: string): Promise<void> {
    await this.page.locator("#customer\\.address\\.zipCode").fill(zipCode);
  }

  async enterPhoneNumber(phoneNumber: string): Promise<void> {
    await this.page.locator("#customer\\.phoneNumber").fill(phoneNumber);
  }

  async enterSSN(ssn: string): Promise<void> {
    await this.page.locator("#customer\\.ssn").fill(ssn);
  }

  async enterRegisterUsername(username: string): Promise<void> {
    await this.page.locator("#customer\\.username").fill(username);
  }

  async enterRegisterPassword(password: string): Promise<void> {
    await this.page.locator("#customer\\.password").fill(password);
  }

  async enterConfirmPassword(confirmPassword: string): Promise<void> {
    await this.page.locator("#repeatedPassword").fill(confirmPassword);
  }

  async clickRegisterButton(): Promise<void> {
    await this.page.click("input[value='Register']");
  }

  // ─── Compound Method ───────────────────────────────────────────────────────

  /**
   * Navigates to the Register page, fills all form fields from a
   * RegistrationData object, and submits the form.
   */
  async fillRegistrationForm(data: RegistrationData): Promise<void> {
    await this.clickRegister();
    await this.enterFirstName(data.firstName);
    await this.enterLastName(data.lastName);
    await this.enterAddress(data.address);
    await this.enterCity(data.city);
    await this.enterState(data.state);
    await this.enterZipCode(data.zipCode);
    await this.enterPhoneNumber(data.phoneNumber);
    await this.enterSSN(data.ssn);
    await this.enterRegisterUsername(data.username);
    await this.enterRegisterPassword(data.password);
    await this.enterConfirmPassword(data.confirmPassword);
    await this.clickRegisterButton();
  }

  // ─── Assertions ────────────────────────────────────────────────────────────

  async verifyRegistrationSuccess(): Promise<void> {
    await expect(
      this.page.locator(
        "text=Your account was created successfully. You are now logged in."
      )
    ).toBeVisible({ timeout: 10_000 });
  }

  async verifyUserAlreadyExists(): Promise<void> {
    await expect(
      this.page.locator("text=This username already exists.")
    ).toBeVisible({ timeout: 10_000 });
  }

  async verifyPasswordMismatch(): Promise<void> {
    await expect(
      this.page.locator("text=Passwords did not match.")
    ).toBeVisible({ timeout: 10_000 });
  }

  async verifyRequiredFieldErrors(): Promise<void> {
    const errors = this.page.locator("span.error");
    await expect(errors.first()).toBeVisible({ timeout: 10_000 });
    const count = await errors.count();
    expect(count).toBeGreaterThan(0);
  }
}