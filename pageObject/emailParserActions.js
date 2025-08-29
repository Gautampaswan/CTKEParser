const { expect } = require('@playwright/test');

class emailParserActions {

    constructor(page) {
        
        //------------------Email Parser Actions (Before Build)------------------//
        this.page = page;

        this.emailParser = page.locator("a[title='Email Parsers']");

        this.emailParserActions = page.locator("[name='New']").nth(2);

        this.emailParserActionName = page.locator("[name='Name']");

        this.actionType = page.locator("div.slds-combobox").first();

        this.typeCount = page.locator("[role='option']");

        this.actionTypeOptionName = 'Create Record'; //Need to change as per requirement

        this.emailParserLookup = page.locator("[placeholder='Search Email Parsers...']");

        this.emailParserLookupOption = page.locator('.slds-listbox__option-text_entity').first();

        this.sequenceEmailParserAction = page.locator('input.slds-input[name="ctkemailparser__Sequence__c"]');
        
        this.objectType = page.locator("[name='ctkemailparser__ObjectType__c']");

        this.saveButtonEmailAction = page.locator("[name='SaveEdit']");

        
        //--------------After Create a Email Parser Actions --> For Build Functionality----------------//

        //For Email Parser ACtion Record to build that particular record.
        this.emailParserRecordName = page.locator("[data-label='Email Parser Action Name'] slot span").last();

        //Locator For Assertion
        
        this.emailParserActionNameValidation = page.locator('[data-field-id="RecordNameField"] span.test-id__field-value').last();

        this.objectTypeValidation = page.locator('[data-field-id="RecordObjectType_cField"] span.test-id__field-value');

        this.typeValidation = page.locator('[data-field-id="RecordType_cField"] span.test-id__field-value').last();

        this.buildButton = page.locator("[name='ctkemailparser__EmailParserAction__c.ctkemailparser__Build']");

        
        //-----------------------CREATE RECORD MAPPING-----------------------//

        this.fieldMappingNameCount = page.locator(".slds-table.slds-table_cell-buffer.slds-table_bordered tbody tr.slds-hint-parent");

        this.fieldMappingName = 'Last Name (LastName)'; //Need to change as per requirement


        //---------------------SELECT SOURCE DROPDOWN VALUE----------------------//

        this.fieldMappingName2 = 'lastName'; //Need to change as per requirement

        this.sourceDropdown = page.locator(".slds-combobox__input-value").nth(1); //Need to Change as per requirement.

        this.sourceValueCount = page.locator("[role='option']"); //Need to Change as per requirement.

        this.fieldMappingSaveButton = page.locator(".slds-m-left_x-small");
        
        this.closebutton = page.locator("[data-key='close']");

        //For Validating the Field Mapping Value
        this.mappingVaue = page.locator('[slot="output"]').last();

        //Click on the Email Parser Action Record in Email Parser Action Details Page.
        this.EPAreturn = page.locator("[data-field-id='RecordEmailParser_cField'] a");

        this.editButton = page.locator('[title="Edit Active"]');
    
        this.activeCheckBox = page.locator("[name='ctkemailparser__Active__c']").last();

        this.saveButton = page.locator('[name="SaveEdit"]');
        
        //---------------------EMAIL PARSER JOB TAB----------------------//

        this.emailParserJob = page.locator("//span[text()='Email Parser Jobs']");
       
        this.parserJobRecord = page.locator('[data-label="Email Parser Job Name"] .slds-truncate ').first();
      
        this.replayEditButton = page.locator("//span[text()='Edit Replay Job']");

        this.replayJobCheckBox = page.locator("[name='ctkemailparser__ReplayJob__c']");

        this.saveButtonReplayJob = page.locator("[name='SaveEdit']");

        this.relatedTab = page.locator("//a[text()='Related']");

        this.emailParserLog = page.locator("[title='Email Parser Log']");

    }

    async newEmailParserAction(emailParser_ActionName, object_Type, emailParserAction_Sequence) {

        //Click On Email Parser
        await this.emailParser.click();

        //Click on recent created Email Parser
        await this.page.locator("[data-label='Email Parser ID'] div.slds-truncate").first().click();


        //Zoom Out For Capturing Email Filter Actions----
        await this.page.evaluate(() => {
            document.body.style.transform = 'scale(55%)'
        });

        await this.page.waitForTimeout(3000);
        await this.page.keyboard.down('End');

        //Click on New Button Of Email Parser Actions
        await this.emailParserActions.click();

        await this.page.waitForTimeout(3000);
        await this.page.reload();

        //Enter Email Parser Action Name
        //await this.page.waitForTimeout(3000);
        await this.emailParserActionName.fill(emailParser_ActionName,);//also change value with => const emailActionName = 'create record for email parser'; //Need to change as per requirement

        //Click On Type Dropdown.
        await this.page.waitForTimeout(3000);
        await this.actionType.click();

        //Getting the Text of Type Option
        const typeOptionText = await this.typeCount.locator(".slds-media__body").allTextContents();
        console.log(typeOptionText);

        //Getting the Count of Source Option
        const typeOptionValue = await this.typeCount.locator(".slds-media__body").count();
        console.log(typeOptionValue);

        //Iterate Over Type Option.
        for (let i = 0; i < typeOptionValue; ++i) {
            
            const typeOptionValue = await this.typeCount.locator(".slds-media__body").nth(i).textContent();
           
            if (this.actionTypeOptionName.includes(typeOptionValue)) {
                await this.typeCount.locator(".slds-media__body").nth(i).click();
                break;
            }
        }
        
        //Click on email parser Lookup
        await this.emailParserLookup.click();

        //Click on recent created  email parser lookup
        await this.emailParserLookupOption.click();

        //Enter Sequence Number
        await this.sequenceEmailParserAction.fill(emailParserAction_Sequence);

        //Enter Object Type Name
        await this.objectType.fill(object_Type); //Need to change as per requirement (Object Name)

        //Click on Save Button to Save Email Parser Action.
        await this.saveButtonEmailAction.click();

        //-------------------After Create a Email Parser Actions --> BUILD FUNCTIONALITY------------------------//

        //Zoom Out For Capturing Email Filter Actions----
        await this.page.evaluate(() => {
            document.body.style.transform = 'scale(40%)'
        });

        //await page.waitForTimeout(3000);
        await this.page.keyboard.down('End');
       
        //Updated 16-10-24--- Click on the Email Parser Action Record to Build that Particular Record.
        await this.emailParserRecordName.click();

        //Reload Page
        await this.page.waitForTimeout(2000);

        await this.page.reload();

        //-----------------------------ASSERTIONS-----------------------------//

        //To Validate the Email Parser Actions Name.
        await this.page.waitForTimeout(3000);
        await expect(this.emailParserActionNameValidation).toHaveText("Create Record for a Particular Object.");

        //To Validate the Type of Record Creation.
        await this.page.waitForTimeout(3000);
        await expect(this.typeValidation).toHaveText("Create Record");
        
        ///To Validate the Object Type.
        await this.page.waitForTimeout(3000);
        await expect(this.objectTypeValidation).toHaveText("Contact");

        //Click on Build Button
        await this.buildButton.click();

        //-----------------------CREATE RECORD MAPPING-----------------------//

        await this.page.keyboard.down('End');

        //Getting the Text of Email Parser Actions
        const fieldMappingNameText = await this.fieldMappingNameCount.locator("td").first().textContent();
        console.log(fieldMappingNameText);

        //Getting the Count of Email Parser Actions
        const fieldMappingValue = await this.fieldMappingNameCount.count();
        console.log(fieldMappingValue);

        //Iterate Over Email Parser Actions.
        for (let n = 0; n < fieldMappingValue; ++n) {

            const fieldMappingValue = await this.fieldMappingNameCount.locator("td").nth(n).textContent();

            if (this.fieldMappingName.includes(fieldMappingValue)) {
                await this.fieldMappingNameCount.locator("td").nth(n).click();
                break;
            }
        }

        //---------------------SELECT SOURCE DROPDOWN VALUE----------------------//

        //Click on Source
        await this.sourceDropdown.click();

        //Getting the Text of Type Option
        const sourceOptionText = await this.sourceValueCount.locator(".slds-media__body").allTextContents();
        console.log(sourceOptionText);

        //Getting the Count of Source Option
        const sourceOptionValue = await this.sourceValueCount.count();
        console.log(sourceOptionValue);

        //Iterate Over Source Option.
        for (let s = 0; s < sourceOptionValue; ++s) {
            const sourceOptionValue = await this.sourceValueCount.locator(".slds-media__body").nth(s).textContent();

            if (this.fieldMappingName2.includes(sourceOptionValue)) {
                await this.sourceValueCount.locator(".slds-media__body").nth(s).click();
                break;
            }
        }

        // Click On Save Button
        await this.fieldMappingSaveButton.click();

        // Close the Pop-Up Screen
        await this.closebutton.click();

        //Getting the Text of Mapping Value.
        await this.page.waitForTimeout(3000);
        const mappingDataText = await this.mappingVaue.textContent();
        console.log(mappingDataText);

        //In Section to validate the field contins mapping value or not.
        await this.page.waitForTimeout(3000);
        await expect(this.mappingVaue).not.toBeEmpty();


        //By Clicking on Email Parser Move Back to the Record
        await this.EPAreturn.click();

        //Click on the Edit Button to Mark the checkbox checked.
        await this.editButton.click();

        //Click on Checkbox - Updated ACtive Checkbox Functionality.
        await this.activeCheckBox.click();
        await expect(this.activeCheckBox).toBeChecked();

        //Click on the Save button after mark the active checkbox checked.
        await this.saveButtonEmailAction.click();

        //---------------------EMAIL PARSER JOB TAB----------------------//

        //Go to the Email Parser Job Tab for create the record.
        await this.page.waitForTimeout(3000);
        await this.emailParserJob.click();

        //Click on the Email Parser Job Record Name
        await this.parserJobRecord.click();

        //Click on the Edit Button to checked the Replay Job checkbox.
        await this.replayEditButton.click();

        //Click on the Replay Job Checkbox
        await this.page.waitForTimeout(3000);
        await this.replayJobCheckBox.click();

        //Click on the Save button after matrked the replay job chcek box checked
        await this.page.waitForTimeout(3000);
        await this.saveButtonReplayJob.click();

        //CLcik on the Related tab to verify the Email Parser Log
        await this.page.waitForTimeout(3000);
        await this.relatedTab.click();

        //Click on the EMail Parser Log
        await this.emailParserLog.click();

        await this.page.pause();
     
    }
}
module.exports = { emailParserActions };