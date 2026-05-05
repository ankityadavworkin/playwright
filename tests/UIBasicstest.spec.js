const {test,expect} = require('@playwright/test');

// javscript is Async in nature, so we need to use async/await to handle the asynchronous operations in Playwright. 
// The test function is defined as an async function, which allows us to use await for the Playwright operations.
// async({browser}) is a fixture provided by Playwright that gives us access to the browser instance. 
// We can use it to launch a new browser, create new pages, and perform actions on those pages.
//  In this test, we are using the browser fixture to launch a new browser, create a new page, 
// navigate to Google, perform a search, and then close the browser.

// Test 1
test('Browser Context First Playwright test', async ({browser}) => {      
// step 1: open the browser - context is used to open the browser freshly in each test, 
// so that the tests are independent of each other and do not affect each other's state.
const context = await browser.newContext();
// Open a new page
const page = await context.newPage();
// playwright code goes here
await page.goto('https://www.google.com');
console.log(await page.title());
await expect(page).toHaveTitle('Google'); // Assertion to check if the page title is 'Google'
});

// Test 2
// page is a fixture provided by Playwright that gives us access to a new page instance.  If you don't want to open nrpwser with some cookies
// We can use it to navigate to URLs, interact with elements on the page, and perform various actions.
// In this test, we are using the page fixture to navigate to Google, perform a search, and then close the browser.
test('Page Playwright test', async ({page}) => {      
await page.goto('https://demowebshop.tricentis.com/');
console.log(await page.title());
await expect(page).toHaveTitle('Demo Web Shovcbvcbcvp'); // Assertion to check if the page title is 'Demo Web Shop'
});

// Test 3
// test.only is a method provided by Playwright that allows us to run only a specific test.
test('Page Playwright test if you want run this test only', async ({page}) => {      
await page.goto('https://demowebshop.tricentis.com/');
console.log(await page.title());
await expect(page).toHaveTitle('Demo Web Shop'); // Assertion to check if the page title is 'Demo Web Shop'
});

// Test 4
// test.skip is a method provided by Playwright that allows us to skip a specific test.
test.only('Page Playwright test if you want skip this test', async ({page}) => {
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
console.log(await page.locator(".card-body a").textContent());
});

