const { test, expect } = require('@playwright/test');

const { loginPage } = require('../pageObject/loginPage_To');
const { exportAndImport } = require('../pageObject/exportAndImport');


test('Export functionality', async ({ page }) => {
  
    //Creating a login page using constructor
    const login_Page = new loginPage(page);

    //Calling goto method from the loginPage class
    await login_Page.goto();
    
    const user_name = 'optimus6293@gmail.com';
    const pass_word = 'Sourabh@123';

    //Calling Valid Login Method from login Page Class
    await login_Page.validLogin(user_name, pass_word);

    //Waiting for all API's call to be made
    await page.waitForLoadState('networkidle');

    const exportMethod = new exportAndImport(page);
    await exportMethod.Export();
});

test('Import Functionality', async ({ page }) => {

     //Creating a login page using constructor
     const login_Page = new loginPage(page);

     //Calling goto method from the loginPage class
     await login_Page.goto();
     
     const user_name = 'optimus6293@gmail.com';
     const pass_word = 'Sourabh@123';
 
     //Calling Valid Login Method from login Page Class
     await login_Page.validLogin(user_name, pass_word);
 
     //Waiting for all API's call to be made
     await page.waitForLoadState('networkidle');
 
     const exportMethod = new exportAndImport(page);
     await exportMethod.import();
});
