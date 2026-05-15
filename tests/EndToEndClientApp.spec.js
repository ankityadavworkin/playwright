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
const productName = "ZARA COAT 3";
await page.goto("https://rahulshettyacademy.com/client");
await username.fill("ranveeryadav5555@gmail.com");
await password.fill("Demo@123");
await signInBtn.click();
await page.waitForLoadState('networkidle'); 
const productsTitlesParent = page.locator(".card-body");
const productsTitlesLocator = page.locator(".card-body b");
await productsTitlesLocator.first().waitFor(); // This will wait for the first element located by ".card-body b" to be visible on the page before proceeding with the next steps.
const titles = await productsTitlesLocator.allTextContents(); // This will return an array of all the text contents of the elements located by ".card-body b"
console.log("All product titles: " + titles);
const productsCount = await productsTitlesLocator.count(); // This will return the number of elements located by ".card-body b", which is the count of products displayed on the page.
console.log("Number of products: " + productsCount);

for(let i=0; i<productsCount; i++){
   if(await productsTitlesLocator.nth(i).textContent() === productName){
       console.log("Product found: " + productName);
       await productsTitlesParent.nth(i).locator("text= Add To Cart").click(); // This will click on the "Add To Cart" button for the product that matches the productName.
       break; // Exit the loop once the product is found and added to the cart.
   }
}
await page.locator("[routerlink*='cart']").click(); // This will click on the cart link to navigate to the cart page.
// const isProductVisible = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // This will wait for the product "ZARA COAT 3" to be visible in the cart page before proceeding with the next steps.
const isProductVisible = await page.locator("h3:has-text('"+productName+"')").isVisible(); // This will wait for the product "ZARA COAT 3" to be visible in the cart page before proceeding with the next steps.
expect(isProductVisible).toBeTruthy(); // This will assert that the product "ZARA COAT 3" is visible in the cart page, confirming that it was successfully added to the cart.
await page.waitForTimeout(3000);
});