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
// await page.pause(); // This will pause the test execution and open the Playwright Inspector, allowing you to interact with the page and inspect elements.
});


// Test 2 - Client Dashboard End to End FLow
test('This test case performing client website end-to-end testing', async ({page}) =>{
const username = page.locator("#userEmail");
const password = page.locator("#userPassword");
const signInBtn = page.locator("#login"); 
const productName = "ZARA COAT 3";
const userName = "ranveeryadav5555@gmail.com";
await page.goto("https://rahulshettyacademy.com/client");
await username.fill(userName);
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
await page.locator("div li").last().waitFor(); // This will wait for the list item in the cart page to be visible before proceeding with the next steps.
const isProductVisible = await page.locator("h3:has-text('ZARA COAT 3')").isVisible(); // This will wait for the product "ZARA COAT 3" to be visible in the cart page before proceeding with the next steps.
await expect(isProductVisible).toBeTruthy(); // This will assert that the product "ZARA COAT 3" is visible in the cart page, confirming that it was successfully added to the cart.
await page.locator("text=Checkout").click(); // This will click on the "Checkout" button to proceed to the checkout page.
const expiryMonth = page.locator("//select[@class='input ddl'][1]");
await expiryMonth.selectOption("10"); // This will select the option with value "10" from the expiry month dropdown.
const expiryDate = page.locator("//select[@class='input ddl'][2]");
await expiryDate.selectOption("10"); // This will select the option with value "10" from the expiry date dropdown.
await page.locator("input[class='input txt']").nth(0).fill("123"); // This will fill the first input field with the credit card number "1234567890123456".
await page.locator("input[class='input txt']").nth(1).fill("ANKIT YADAV"); // This will fill the first input field with the credit card number "1234567890123456".
await page.locator("[name='coupon']").fill("rahulshettyacademy"); 
await page.locator("[type='submit']").click(); // This will click on the "Apply" button to apply the coupon code.
await expect (page.locator("[style='color: green;']")).toContainText("* Coupon Applied"); // This will assert that the text "* Coupon Applied" is visible on the page, confirming that the coupon was applied successfully.
await page.locator("[placeholder*='Country']").pressSequentially("India",{delay: 200}); // This will type sequentially "India" into the country input field, which has a placeholder attribute that contains the text "Country".
const dropDown = page.locator(".ta-results"); // This will locate all the options in the country dropdown that appears after typing "India".
await dropDown.waitFor(); // This will wait for the options in the country dropdown to be visible before proceeding with the next steps. 
const optionsCount = await dropDown.locator("button").count(); // This will get the count of options in the dropdown.
for(let i=0; i<optionsCount; i++){
    const text = await dropDown.locator("button").nth(i).textContent();
    if(text.trim() === "British Indian Ocean Territory"){
        await page.waitForTimeout(2000);
        await dropDown.locator("button").nth(i).click();
        break; // Exit the loop once the "India" option is found and clicked.
    }
}
console.log("Label Text: " + await (page.locator("[class*='user__name'] label[type='text']")).textContent()); 
await expect (page.locator("[class*='user__name'] label[type='text']")).toHaveText(userName); 
console.log("Input Value: " + await (page.locator("[class*='user__name'] input[type='text']")).inputValue()); // This will assert that the text "* Coupon Applied" is visible on the page, confirming that the coupon was applied successfully.
await expect (page.locator("[class*='user__name'] input[type='text']")).toHaveValue(userName); // This will assert that the text "* Coupon Applied" is visible on the page, confirming that the coupon was applied successfully.
await page.locator("[class*='btnn action__submit']").click(); // This will click on the "Place Order" button to complete the purchase.
await page.locator(".hero-primary").waitFor(); // This will wait for the element with class "hero-primary" to be visible on the page before proceeding with the next steps.
await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. "); // This will assert that the text "THANKYOU FOR THE ORDER." is visible on the page, confirming that the order was placed successfully.
const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent(); // This will get the text content of the label that contains the order ID and store it in the variable orderId.
console.log("Order ID: " + orderId);
await page.locator("button[routerlink='/dashboard/myorders']").click(); // This will click on the "My Orders" button to navigate to the orders page.
const cleanedOrderId = orderId.replace(/\|/g, "").trim();
console.log(cleanedOrderId);
await page.locator("tbody tr").first().waitFor(); // This will wait for the table rows in the orders page to be visible before proceeding with the next steps.
const orderLocator = await page.locator("tbody tr");
const orderCount = await orderLocator.locator("th").count();
console.log("Number of orders: " + orderCount);
for(let i=0; i<orderCount; i++){
    const text = await orderLocator.nth(i).locator("th").textContent(); 
    console.log("Order ID in table: " + text);
    if(text.trim() === cleanedOrderId){
        await orderLocator.nth(i).locator("button").first().click();
        break; // Exit the loop once the order with the matching order ID is found and the "View" button is clicked.
    }
}
await page.locator(".col-text").waitFor(); // This will wait for the element with class "col-text" to be visible on the page before proceeding with the next steps.
await expect (page.locator(".col-text")).toHaveText(cleanedOrderId); // This will assert that the order ID displayed on the order details page matches the cleaned order ID, confirming that the correct order details are being displayed.
await expect (page.locator("//div[@class='address']/div[text()=' Billing Address ']//following-sibling::p[1]")).toHaveText(userName); // This will assert that the order ID displayed on the order details page matches the cleaned order ID, confirming that the correct order details are being displayed.
await expect (page.locator(".artwork-card-info .title")).toHaveText(productName); // This will assert that the order ID displayed on the order details page matches the cleaned order ID, confirming that the correct order details are being displayed.
// await page.waitForTimeout(3000);

});