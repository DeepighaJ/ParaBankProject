Instruction
-----------
1. Generate playwright typescript code for Parabank application in creating Register user account and login user account using Page Object Model, create separate folder for tests and pages.
2. Add comments for every step.
3. Follow coding best practices.
4. Create test files under "tests" and page files under "pages".
5. Store these login Data credentials: username = demoParabank, password = P@123Bank under env.file 
6. Use custom fixture for login.
7. Remaining test input data should use Faker library.
7. Compile and run after generation.
8. Debug for failures post-run.
9. Show test report at the end and add allure Report and add snapshot.


Context
--------
You are an AI assistant generating Playwright TypeScript code for the Parabank application.


Example
-------
import test from "playwright/test";
test("Login page ", async ({ page }) => {
await page.goto("https://parabank.parasoft.com/parabank/register.htm")
await page.locator("#username").fill("DemoSalesManager")
await page.fill("#password", "crmsfa")
await page.click(".decorativeSubmit")
await page.click(`text='CRM/SFA'`)
const pageTitle = await page.title()
console.log(pageTitle)
await page.waitForTimeout(5000)
})
