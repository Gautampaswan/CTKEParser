const { expect } = require('@playwright/test');


class CTKEmailParserSetUp {

    constructor(page) {

        this.page = page;
        
        this.appLauncher = page.locator(".slds-icon-waffle");
    
        this.searchBar = page.locator("[placeholder='Search apps and items...']");
    
        this.CTKEmail = page.locator("//p[text()=' Email Parser']");
        this.clickCTKEmailParser = page.locator("//span[text()= 'CTK Email Parser Setup']");
        this.ClickIngestEmail = page.locator("//span[text() = 'Ingest Emails via Document Upload']");
        this.clickContactOption = page.locator("//span[text() = 'Contact (Contact)']");
        this.moveDropdown = page.locator("[title='Move to ']");
        this.clickSaveButton = page.locator("//button[text()='Save']");
    
       
    }
    async EmailSetUp() { 
        //Click on App Launcher Button
        await this.appLauncher.click();

        //Click on Search Bar
        await this.searchBar.click();

        //Search Sales on Search Bar and Select Sales App
        await this.page.locator('[placeholder="Search apps and items..."]').fill("CTK", { delay: 100 });
        
        //Click on CTK Email Parser App
        await this.CTKEmail.click();
        await this.clickCTKEmailParser.click();
        await this.ClickIngestEmail.click();
        await this.clickContactOption.click();
        await this.moveDropdown.click();
        await this.clickSaveButton.click();
    }

    
}
module.exports = {CTKEmailParserSetUp};
