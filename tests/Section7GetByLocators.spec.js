const { test, expect } = require('@playwright/test');

test('38. Understand how GetByLabel & Playwright UI Runner works with an example', async ({page}) => {    
await page.goto('https://rahulshettyacademy.com/angularpractice/');
await page.getByLabel('Check me out if you Love IceCreams!').click();
await page.getByLabel('Employed').click();
await page.getByLabel('Employed').check(); // Work same as click
await page.getByLabel('Gender').selectOption("Female");
await page.getByPlaceholder('Password').fill('test@gmail.com');
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Success! The Form has been submitted successfully!.').waitFor();
await page.getByText('Success! The Form has been submitted successfully!.').click();
await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();
await page.getByRole('link', {name: 'Shop'}).click();
// await page.locator("app-card").filter({ hasText: 'Blackberry' }).getByRole("button", { name: "Add To Cart" }).click();
await page.locator("app-card").filter({ hasText: 'Blackberry' }).getByRole("button").click();
await page.pause(); 
});

test('39. Understand how GetByRole works with an example', async ({page}) => {    
await page.goto('https://rahulshettyacademy.com/angularpractice/');
await page.getByRole('checkbox', { name: 'Check me out if you Love IceCreams!' }).check();
await page.getByRole('radio', { name: 'Employed' }).check();
await page.getByRole('combobox', { name: 'Gender' }).selectOption("Female");
await page.getByRole('spinbutton', { name: 'Date of Birth' }).fill('10/10/1992');
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByText('Success! The Form has been submitted successfully!.').waitFor();
await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible();
});

test('42. Rewrite end to end test with getByRole, getByText conjuction with Filter logic', async ({page}) => {    
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
await productsTitlesParent.filter({hasText: productName})
.getByRole("button", { name: "Add To Cart" }).click(); 
await page.getByRole("listitem").getByRole('button', { name: 'Cart' }).click();
await page.locator("div li").last().waitFor();
await expect(page.getByText("ZARA COAT 3")).toBeVisible();
// await page.locator("text=Checkout").click();
await page.getByRole("button",{name:"Checkout"}).click();
// await page.locator("[placeholder*='Country']").pressSequentially("India",{delay: 200});
await page.getByPlaceholder("Select Country").pressSequentially("India",{delay: 200});
/*
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
*/
await page.getByRole("button", {name:"India"}).nth(0).click();
await page.getByText("Place Order").click();
await expect(page.getByText("Thankyou for the order.")).toBeVisible();

});
