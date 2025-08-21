const { expect } = require('@playwright/test');

class emailFilter {
    
    constructor(page) {

        this.page = page;

        //Create Filter For First Sequence--- Domain Verification
        this.emailParser = page.locator("[title='Email Parsers']");

        this.emailFilterNew = page.locator("[name='New']").nth(0);

        this.emailFilterName = page.locator("[name='Name']");

        //For Source Dropdown Using Loop For all Option
        this.source = page.locator("[role='combobox']").nth(0);

        this.sourceOptionCount = page.locator("[role='option']");

        //Select Different Picklist Value for different condtion-----
        this.sourceOptionName = 'Header'; //Need to change as per requirement

        //If Choose another value except 'From'
        this.headerName = page.locator("[name='ctkemailparser__HeaderName__c']");

        //const getTextOfOption = page.locator(".slds-media__body");

        this.value = page.locator('input.slds-input[name="ctkemailparser__Value__c"]');

        this.sequence = page.locator('input.slds-input[name="ctkemailparser__Sequence__c"]');

        this.saveButton = page.locator("[name='SaveEdit']");

        //--------For OPERATION DROPDOWN---------//

        //For Operation Dropdown Using Loop For all Option
        this.operation = page.locator("[role='combobox']").nth(1);

        this.operationOptionCount = page.locator("[data-field-id='Recordctkemailparser_Operation_cField']");
        
        this.operationOptionName = 'Contains'; //Need to change as per requirement and compare with Source Option

        //Email Filter ----- Validation -------//

        this.emailFilterRecordName = page.locator('th[data-label="Email Filter Name"] span.slds-truncate');

        this.emailFilterNameValidation = page.locator('[data-field-id="RecordNameField"] span.test-id__field-value').last();

        this.operationValidation = page.locator('[data-field-id="Recordctkemailparser_Operation_cField"] span.test-id__field-value').last();

        this.headerNameValidation = page.locator('[data-field-id="Recordctkemailparser_HeaderName_cField"] span.test-id__field-value');

        this.valueValidation = page.locator('[data-field-id="Recordctkemailparser_Value_cField"] span.test-id__field-value').last();

        //Click on the Email Parser Record in Email Filter Details Page.
        this.EPreturn = page.locator("[data-field-id='Recordctkemailparser_EmailParser_cField'] div.slds-grid").last();

    }

    async newEmailFilter(email_Filter_Name, filter_Value, email_Sequence) {

        //Click On Email Parser
        await this.emailParser.click();

        //Create Filter For First Sequence--- Domain Verification
        //Click on recent created Email Parser
        await this.page.locator("[data-navigable='true']").first().click();

        //Click on New Button of Email Filters
        await this.emailFilterNew.click();

        //Enter Email Filter Name
        await this.emailFilterName.fill(email_Filter_Name);

        //Click on Source Dropdown
        await this.source.click();

        //Getting the Text of Source Option
        const sourceOptionText = await this.sourceOptionCount.locator(".slds-media__body").allTextContents();
        console.log(sourceOptionText);

        //Getting the Count of Source Option
        const sourceOptionValue = await this.sourceOptionCount.locator(".slds-media__body").count();
        console.log(sourceOptionValue);

        //Iterate Over Source Option.
        for (let j = 0; j < sourceOptionValue; ++j) {
            if (await this.sourceOptionCount.locator(".slds-media__body").nth(j).textContent() === this.sourceOptionName) {
                await this.sourceOptionCount.locator(".slds-media__body").nth(j).click();
                break;
            }
        }

        //For header name text enter value here
        await this.headerName.fill('Subject');

        //--------For OPERATION DROPDOWN---------//
        
        //Click on Source Dropdown
        await this.operation.click();

        //Getting the Text of Operation Option
        const operationOptionText = await this.operationOptionCount.locator(".slds-media__body").allTextContents();
        console.log(operationOptionText);

        //Getting the Count of Operation Option
        const operationOptionValue = await this.operationOptionCount.locator(".slds-media__body").count();
        console.log(operationOptionValue);

        //Iterate Over Operation Option.
        for (let k = 0; k < operationOptionValue; ++k) {
            if (await this.operationOptionCount.locator(".slds-media__body").nth(k).textContent() === this.operationOptionName) {
                await this.operationOptionCount.locator(".slds-media__body").nth(k).click();
                break;
            }
        }

        //Enter Value - Domain
        await this.value.fill(filter_Value);

        //Enter Sequence Number
        await this.sequence.fill(email_Sequence);

        //Click on Save Button to Save Email Filter.
        await this.saveButton.click();


        //-------------------ASSERTIONS--------------------------//

        //Click on the Email Filter Record Name
        await this.emailFilterRecordName.click();

        //To Validate the Email Filter Name.
        await this.page.waitForTimeout(3000);
        await expect(this.emailFilterNameValidation).toHaveText("Header Verification");

        //To Validate the Email Filter Name.
        await this.page.waitForTimeout(3000);
        await expect(this.headerNameValidation).toHaveText("Subject");

        //To Validate the Operation in Email Filter .
        await this.page.waitForTimeout(3000);
        await expect(this.operationValidation).toHaveText("Contains");
          
        //To Validate the Object Type.
        await this.page.waitForTimeout(3000);
        await expect(this.valueValidation).toHaveText("Test Attachment For CTK Email Parser.");
        
        //By Clicking on Email Parser Move Back to the Record
        await this.EPreturn.click();

        await this.page.keyboard.down('End');

    }
}
module.exports = { emailFilter };