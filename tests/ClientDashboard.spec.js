const {test,expect} = require('@playwright/test');

// javscript is Async in nature, so we need to use async/await to handle the asynchronous operations in Playwright. 
// The test function is defined as an async function, which allows us to use await for the Playwright operations.
// async({browser}) is a fixture provided by Playwright that gives us access to the browser instance. 
// We can use it to launch a new browser, create new pages, and perform actions on those pages.
//  In this test, we are using the browser fixture to launch a new browser, create a new page, 
// navigate to Google, perform a search, and then close the browser.

// Test 1
test.only('Client App SignuPage Playwright test', async ({page}) => {     

// SignUp Page
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
await page.locator("//input[@formcontrolname='gender']").nth(1).click();
expect (page.locator("//input[@formcontrolname='gender']").nth(1)).toBeChecked();
console.log("Checkbox Status: "+await page.locator("//input[@formcontrolname='gender']").nth(1).isChecked());
await userPassword.fill("Demo@123");
await confirmPassword.fill("Demo@123");
await page.locator("//input[@formcontrolname='requirzed']").click();
expect (page.locator("//input[@formcontrolname='required']")).toBeChecked();
await page.locator("//input[@formcontrolname='requirzed']").uncheck();
await page.waitForTimeout(3000);
});

// Test 2 - Client Dashboard
test('SignUp Dashboard - Rahul shetty academy for client dashboard', async ({page}) =>{
const username = page.locator("#userEmail");
const password = page.locator("#userPassword");
const signInBtn = page.locator("#login"); 
await page.goto("https://rahulshettyacademy.com/client");
await username.fill("anshika@gmail.com");
await password.fill("Iamking@000");
await signInBtn.click();
await page.waitForLoadState('networkidle'); 
await page.locator(".card-body b").first().waitFor;
const titles = await page.locator(".card-body b").allTextContents();
console.log(titles);
});

// Test 3
// test.skip is a method provided by Playwright that allows us to skip a specific test.
test('Page Playwright test if you want skip this test', async ({page}) => {
const username = page.locator("[id='username']");
const password = page.locator('#password');
const signInBtn = page.locator('#signInBtn');
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
console.log(await page.title());
await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy'); // Assertion to check if the page title is 'Demo Web Shop'
// Playwright 'type' deprecated, 'fill' is used to enter any value in the input field in latest versions of Playwright.
// await page.locator("//input[@id='username']").fill('rahulshettyacademy');
await username.fill('vcx');
await password.fill('learning');
await signInBtn.click();
console.log(await page.locator("[style*='block']").textContent());
// Here * is used to match any element that contains the text 'block' in its style attribute.
await expect(page.locator("[style*='block']")).toContainText('Incorrect'); // Assertion to check if the error message contains 'Incorrect'
await username.fill(""); // Clear the username field
await username.fill('rahulshettyacademy');
await password.fill('Learning@830$3mK2');
await signInBtn.click();
const cardTitles = page.locator('.card-body a');
console.log(await cardTitles.first().textContent());
await expect(cardTitles.first().toContainText('iphone X'));
console.log(await cardTitles.nth(1).textContent());
const allTitles = await cardTitles.allTextContents(); 
// grab all the titles content and playwright will not wait for "alltextContents" action
console.log(allTitles);
});

