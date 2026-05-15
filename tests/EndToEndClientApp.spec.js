const { test, expect } = require('@playwright/test');

// Test 1 - Client App SignuPage
test('Rahul Shetty - Client App SignuPage Playwright test', async ({page}) => {     
const firstName = page.locator("#firstName");     
const lastName = page.locator("#lastName");     
const userEmail = page.locator("#userEmail");     
const userMobile = page.locator("#userMobile");       
const gender = page.locator("//input[@value='Male']");     
const userPassword = page.locator("#userPassword");     
const confirmPassword = page.locator("#confirmPassword");     
await page.goto('https://rahulshettyacademy.com/client/#/auth/register');
console.log(await page.title());
await expect(page).toHaveTitle('Let\'s Shop'); 
await firstName.fill('Ankit');
await lastName.fill('Yadav');
await userEmail.fill('ranveeryadav5555@gmail.com');
await userMobile.fill('8445688822');
const occupations = page.locator("//select[@formcontrolname='occupation']");
await occupations.selectOption("2: Student");
await page.locator("//input[@formcontrolname='gender']").nth(0).click();
expect (await page.locator("//input[@formcontrolname='gender']").nth(0)).toBeChecked();
console.log("Checkbox Status: "+await page.locator("//input[@formcontrolname='gender']").nth(0).isChecked());
await userPassword.fill("Demo@123");
await confirmPassword.fill("Demo@123");
await page.locator("//input[@formcontrolname='required']").click();
await expect (page.locator("//input[@formcontrolname='required']")).toBeChecked();
// await page.locator("//input[@formcontrolname='required']").uncheck();
// expect (await page.locator("//input[@formcontrolname='required']").isChecked()).toBeFalsy();
// await page.waitForTimeout(3000);
await page.pause(); // This will pause the test execution and open the Playwright Inspector, allowing you to interact with the page and inspect elements.
});

// Test 2 - Client Dashboard Login Page
test('SignUp Dashboard - Rahul shetty academy Login Page Pracytice', async ({page}) =>{
const username = page.locator("#userEmail");
const password = page.locator("#userPassword");
const signInBtn = page.locator("#login"); 
await page.goto("https://rahulshettyacademy.com/client");
await username.fill("ranveeryadav5555@gmail.com");
await password.fill("Demo@123");
await signInBtn.click();
await page.waitForLoadState('networkidle'); 
await page.locator(".card-body b").first().waitFor;
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);
});