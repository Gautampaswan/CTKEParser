const { expect } = require('@playwright/test');

class fieldParser {

    constructor(page) {
        
        this.page = page;
        
        //------------------Field Parser (Before Build)------------------//

        this.newButton = page.locator("[name='New']");
        
        this.type = page.locator("[role='combobox']").nth(0);

        this.totalnumberoftypes = page.locator("[role='option']");

        this.actionTypeOtionName = 'Full Value'; //Need to Change as per requirement

        this.refrenceName = page.locator("[name='ctkemailparser__ReferenceName__c']");

        this.source = page.locator("[role='combobox']").nth(3);

        this.sourceOptionCount = page.locator("[role='option']"); 

        this.sourceName = 'From Name'; //Need to Change as per requirement
         
        this.MultipleResultHandler = page.locator("[role='combobox']").nth(4);

        this.MultipleResultHandleroption = page.locator("[role='option']");

        this.MultipleResultHandlerName = 'First'; //Need to Change as per requirement

        this.saveButtonforfilter = page.locator("[name='SaveEdit']");


        //Locator For Assertion
        
        this.referenceNameValidation = page.locator('[data-field-id="RecordReferenceName_cField"] [slot="output"]');

        this.sourceTypeValidation = page.locator('[data-field-id="RecordSource_cField"] span.test-id__field-value');


        //------------------BUILD THE FIELD PARSER------------------//

        this.parserRecord = page.locator("[data-label='Field Parser Key']").first();

        this.buildButton = page.locator("[name='ctkemailparser__FieldParser__c.ctkemailparser__Editor']");

      /*  this.RangeStart = page.locator("[role='combobox']");

        this.Rangestartoption = page.locator("[role='option']");

        this.rangestartName = 'BlankSpace'; //Need to Change as per requirement

        this.startValue = page.locator("[name='ctkemailparser__RangeStartValue__c']");

        this.RangeEnd = page.locator("[role='combobox']");

        this.RangeEndoption = page.locator("[data-field='RangeEnd__c'] .slds-combobox.slds-dropdown-trigger.slds-dropdown-trigger_click [role='option']");
        
        this.rangeEndName = 'BlankSpace';//Need to Change as per requirement
        
        this.EndValue = page.locator("[name='ctkemailparser__RangeEndValue__c']"); */

        this.testbutton = page.locator(".slds-button.slds-button_outline-brand").nth(1);

        this.save = page.locator("[type='submit']");

        this.closepage = page.locator("[data-key='close']").nth(0);

        //------------New Update Functionality -----(11-10-2024)------

        this.loadEmailJob = page.locator("[title='Load Email from Job']");

        this.searchEmailJob = page.locator("[placeholder='Search Email Parser Jobs...']");

        this.emailParserJob = page.locator(".slds-listbox__option-text").nth(1);

        this.loadTestData = page.locator("//button[text()='Load Test Data']");
        
        //For Processed Value Validation.
        this.testResultProcessed = page.locator("div.val_parsed").last();

    }

    async newFieldParser(reference_Name) {
        
        //clicking on email parser
        await this.newButton.nth(1).click();
              
        //----------------------------------Type Picklist-------------------------------------//
       
        //Click On Type Picklist Dropdown
        await this.page.waitForTimeout(3000);
        await this.type.click();

        //Getting the Text of Type Option
        const typeOptionText = await this.totalnumberoftypes.locator(".slds-media__body").allTextContents();
        console.log(typeOptionText);

        //Getting the Count of Type Option
        const typeOptionValue = await this.totalnumberoftypes.count();
        console.log(typeOptionValue);

        //Iterate Over Type Option.
        for (let l = 0; l < typeOptionValue; ++l) {
            if (await this.totalnumberoftypes.locator(".slds-media__body").nth(l).textContent() === this.actionTypeOtionName) {
                await this.totalnumberoftypes.locator(".slds-media__body").nth(l).click();
                break;
            }
        }

        //fill the reference name 
        await this.refrenceName.fill(reference_Name);

        //----------------------------------Source Picklist----------------------------------//

        //Click on Source Dropdown
        await this.page.waitForTimeout(3000);
        await this.source.click();

        //Getting the Text of Source Option
        const sourceOption = await this.sourceOptionCount.locator(".slds-media__body").allTextContents();
        console.log(sourceOption);

        //Getting the Count of Source Option
        const sourceCount = await this.sourceOptionCount.locator(".slds-media__body").count();
        console.log(sourceCount);

        for (let j = 0; j < sourceCount; ++j) {
            if (await this.sourceOptionCount.locator(".slds-media__body").nth(j).textContent() === this.sourceName) {
                await this.sourceOptionCount.locator(".slds-media__body").nth(j).click();
                break;
            }
         }
        
        
        //----------------------------Multiple Results Configurations PickList-------------------------------//

        //Click on the Multiple Results Configurations Dropdown
        await this.MultipleResultHandler.click();

        //Getting the Text of Multiple Results Configurations
        const MRHOption = await this.MultipleResultHandleroption.locator(".slds-media__body").allTextContents();
        console.log(MRHOption);

        //Getting the Count of Multiple Results Configurations
        const MRHCount = await this.MultipleResultHandleroption.count();
        console.log(MRHCount);

        // Iterate Over Multiple Results Configurations
        for (let c = 0; c < MRHCount; ++c) {
            const MRHValue = await this.MultipleResultHandleroption.locator(".slds-media__body").nth(c).textContent();
            if (this.MultipleResultHandlerName.includes(MRHValue)) {
                await this.MultipleResultHandleroption.locator(".slds-media__body").nth(c).click();
                break;
            }
        }
           
        //Click on Save Button to Save Email Filter.
        await this.saveButtonforfilter.click();
    }
    
    //----------------------------------------BUILD FUNCTIONALITY---------------------------------------------//

    async newBuildFieldParser(range_StartValue, range_EndValue) 
        {
        await this.page.keyboard.down('End');
        const record = await this.parserRecord.textContent();
        console.log(record);

        //Getting the Count of Email Parser Actions
        await this.parserRecord.locator("a").click();

        //-------------------------------------ASSERTIONS-------------------------------------//

        //To Validate the Field Parser Reference Name.
        await this.page.waitForTimeout(3000);
        await expect(this.referenceNameValidation).toHaveText("lastName");
        
        //To Validate the Field Parser Reference Name.
        await this.page.waitForTimeout(3000);
        await expect(this.sourceTypeValidation).toHaveText("From Name");
       
        //Click on Build Button
        await this.buildButton.click();
        
    /*    //---------------------------------------Start Range Picklist---------------------------------------//

        //Click on RangeStart Dropdown
        await this.page.waitForTimeout(3000);
        await this.RangeStart.nth(4).click();

        //Getting the Text of Start Range
        const RangeOption = await this.Rangestartoption.locator(".slds-media__body").allTextContents();
        console.log(RangeOption);

        //Getting the Count of Start Range
        const rangestartCount = await this.Rangestartoption.count();
        console.log(rangestartCount);

        //Iterate Over Start Range.
        for (let a = 0; a < rangestartCount; ++a) {
            const rangeValue = await this.Rangestartoption.locator(".slds-media__body").nth(a).textContent();
            if (this.rangestartName.includes(rangeValue)) {
                await this.Rangestartoption.locator(".slds-media__body").nth(a).click();
                break;
            }
        }

        //Enter the Range Start Value
        // await this.page.waitForTimeout(3000);
        // await this.startValue.fill(range_StartValue);

        //---------------------------------------End Range PickList----------------------------------------//

        //Click on RangeStart Dropdown
        await this.page.waitForTimeout(3000);
        await this.RangeEnd.nth(5).click();

        //Getting the Text of End Range
        const endOption = await this.RangeEndoption.locator(".slds-media__body").allTextContents();
        console.log(endOption);

        //Getting the Count of End Range
        const rangeEndCount = await this.RangeEndoption.count();
        console.log(rangeEndCount);

        // Iterate Over End Range.
        for (let b = 1; b < rangeEndCount; ++b) {
            const rangeEndValue = await this.RangeEndoption.locator(".slds-media__body").nth(b).textContent();
            if (this.rangeEndName.includes(rangeEndValue)) {
                await this.RangeEndoption.locator(".slds-media__body").nth(b).click();
                break;
            }
        }

        // //Enter the Range End Value
        // await this.EndValue.fill(range_EndValue);*/

        await this.page.keyboard.up('Home');

        //Click on the Load Email from Job (For Email JOb)
        await this.loadEmailJob.click();

        //Search Email Job from the search box.
        await this.searchEmailJob.click();

        //Search and click on the Email Job
        await this.page.locator("[placeholder='Search Email Parser Jobs...']").fill("EPJ-", { delay: 100 });

        //Click on the search EMail Job
        await this.emailParserJob.click();

        //Now Click on the Load Test Data Button. (For validating the Formula and Data)
        await this.loadTestData.click();

        //Click on Test Button
        await this.page.waitForTimeout(3000);
        await this.testbutton.click();

        //Getting the Text Processed Value from the Test Result Section.
        await this.page.waitForTimeout(3000);
        const processedValueData = await this.testResultProcessed.textContent();
        console.log(processedValueData);


        //In Test Result Section to validate the field contins value or not.
        await this.page.waitForTimeout(3000);
        await expect(this.testResultProcessed).not.toBeEmpty();
       
        //Click on Save Button
        await this.save.click();

        //Click on Close Button
        await this.closepage.click();

       }
}
module.exports = { fieldParser };