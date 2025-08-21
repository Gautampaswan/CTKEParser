const { expect } = require('@playwright/test');

class emailParser {

    constructor(page) {

        this.page = page;
        
        this.appLauncher = page.locator(".slds-icon-waffle");

        this.searchBar = page.locator("[placeholder='Search apps and items...']");

        this.CTKEmail = page.locator("//p[text()=' Email Parser']");

        this.emailParserName = page.locator("[type='text']").nth(0);

        this.checkBox = page.locator("[part='checkbox']");

        this.filterConfig = page.locator("[role='combobox']");

        this.ORFilter = page.locator("[data-value='OR']");
        
        this.saveButton = page.locator("[name='SaveEdit']");

        //For Assertion Purpose.
        
        this.emailParserRecordName = page.locator('slot[name="output"] [slot="output"]').nth(1);


    }

    async newEmailParser(expect) { 
        
        //Click on App Launcher Button
        await this.appLauncher.click();

        //Click on Search Bar
        await this.searchBar.click();

        //Search Sales on Search Bar and Select Sales App
        await this.page.locator('[placeholder="Search apps and items..."]').fill("CTK", { delay: 100 });
        

        //Click on CTK Email Parser App
        await this.CTKEmail.click();

        //Click on New Button
        await this.page.waitForTimeout(3000);
        await this.page.locator("div[title='New']").click();

        //Enter Email Parser Name
        await this.emailParserName.type("Create New Record for Testing");

        //10-10-2024- For Active Checkbox Need to Unchecked
        //Assertion For Checkbox - Checkbox is selected or not
        await this.page.waitForTimeout(3000);
        await expect(this.checkBox).not.toBeChecked();

        //Click on Filter Configuration
        await this.filterConfig.click();

        //Select OR from Filter Config
        await this.ORFilter.click();

        //Click on Save Button to Save Email Parser.
        await this.saveButton.click();

        //To Validate the EmailParser Record Name.
        await this.page.waitForTimeout(3000);
        await expect(this.emailParserRecordName).toHaveText("Create New Record for Testing");

    }

}

module.exports = { emailParser };