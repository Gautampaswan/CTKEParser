const { expect } = require('@playwright/test');


class exportAndImport {

    constructor(page){
        this.page = page;
        
        this.appLauncher = page.locator(".slds-icon-waffle");
    
        this.searchBar = page.locator("[placeholder='Search apps and items...']");
    
        this.CTKEmail = page.locator("//p[text()=' Email Parser']");
        this.clickCTKEmailParser = page.locator("//span[text()= 'CTK Email Parser Setup']");
        this.clickCheckBox = page.getByRole('gridcell', { name: 'Choose a Row Select All' }).locator('span').nth(2)
    
        this.clickExportButton = page.getByTitle('Export Email Parsers');
        this.exportText = page.getByText('Email Parser records exported successfully!', { exact: true });
        this.importDropdown = page.locator("//span[@title ='Import']");
    
    }

    async Export() {
        try {
            // Click on App Launcher Button
            await this.appLauncher.click();
    
            // Click on Search Bar
            await this.searchBar.click();
    
            // Search Sales on Search Bar and Select Sales App
            await this.page.locator('[placeholder="Search apps and items..."]').fill("CTK", { delay: 100 });
            
            // Click on CTK Email Parser App
            await this.CTKEmail.click();
            await this.clickCTKEmailParser.click();
            await this.page.waitForTimeout(5000);
            
            await this.clickCheckBox.click();
            await this.page.waitForTimeout(10000);
            //check();
            //await this.clickCheckBox.click();
            //await page.getByRole('gridcell', { name: 'Choose a Row Select All' }).locator('span').nth(2).click();
            await this.clickExportButton.click();
    
            // Check if export text is visible
            if (await this.exportText.isVisible()) {
                console.log("Export successfully");
            } else {
                console.log("Did not export");
            }
    
        } catch (error) {
            console.log("Error during export:", error);
        }
    }
    async import() {
        try {
            // Click on App Launcher Button
            await this.appLauncher.click();
    
            // Click on Search Bar
            await this.searchBar.click();
    
            // Search Sales on Search Bar and Select Sales App
            await this.page.locator('[placeholder="Search apps and items..."]').fill("CTK", { delay: 100 });
            
            // Click on CTK Email Parser App
            await this.CTKEmail.click();
            await this.clickCTKEmailParser.click();
            await this.page.waitForTimeout(5000);
            
          
          
           
            if (await this.exportText.isVisible()) {
                console.log("Export successfully");
            } else {
                console.log("Did not export");
            }
    
        } catch (error) {
            console.log("Error during export:", error);
        }
    }
    
}

module.exports = {exportAndImport};