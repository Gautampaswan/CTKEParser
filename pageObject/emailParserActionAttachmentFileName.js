const { expect } = require("@playwright/test");

class emailParserActions {

  constructor(page) {
    //------------------Email Parser Actions (Before Build)------------------//
    this.page = page;

    this.emailParser = page.locator("a[title='Email Parsers']");

    this.emailParserActions = page.locator("[name='New']").nth(2);

    this.emailParserActionName = page.locator("[name='Name']");

    this.actionType = page.locator("div.slds-combobox").first();

    this.typeCount = page.locator("[role='option']");

    this.actionTypeOptionName = "Attach To Record"; // For New Added functionality - Email 'Attach To Record'.

    this.emailParserLookup = page.locator("[placeholder='Search Email Parsers...']");

    this.emailParserLookupOption = page.locator(".slds-listbox__option-text_entity").first();

    this.sequenceEmailParserAction = page.locator('input.slds-input[name="ctkemailparser__Sequence__c"]');

    this.objectType = page.locator("[name='ctkemailparser__ObjectType__c']");

    // For Attach To Record Functionality.
    this.saveAttachments = page.locator('[name="ctkemailparser__SaveAttachments__c"]');

    //--------------------Date - 01-11-2024--------------------//

    // For Attach As Updated Functionality.
    this.attachToRecord = page.locator('[aria-label="Attach as"]').first();

    this.attachAsCount = page.locator("[role='listbox']");

    this.attachAsOptionName = "File (ContentDocument)"; // For New Added functionality - Email 'Attach To Record' -> Need to Change As Per Requirement.

    //New Updated Functionality for 'Attach To Record' in that case Attachment Will be saved in that particular Object 'File & Attachment' section.

    this.filterCriteria = page.locator(".textarea-container");

    this.filterCriteriaText = page.locator(".slds-textarea");

    this.saveButtonEmailAction = page.locator("[name='SaveEdit']");


     //Locator For Assertion
        
          this.emailParserActionNameValidation = page.locator('[data-field-id="RecordNameField"] span.test-id__field-value').last();

          this.objectTypeValidation = page.locator('[data-field-id="RecordObjectType_cField"] span.test-id__field-value');
 
          this.attachAsValidation = page.locator('[data-field-id="Recordctkemailparser_AttachAs_cField"] span.test-id__field-value');
 
          this.saveAttachmentValidation = page.locator('input[name="ctkemailparser__SaveAttachments__c"]');
 
          this.typeValidation = page.locator('[data-field-id="RecordType_cField"] span.test-id__field-value').last();
 
          this.filterCriteriaValidation = page.locator('[data-field-id="RecordFilterCriteria_cField"] span.test-id__field-value');


    //-------------------After Create a Email Parser Actions --> For Build Functionality----------------//

    this.emailParserRecordName = page.locator("[data-label='Email Parser Action Name'] slot span").last();

    this.buildButton = page.locator("[name='ctkemailparser__EmailParserAction__c.ctkemailparser__Build']");

    //-----------------------CREATE RECORD MAPPING-----------------------//

    this.fieldMappingNameCount = page.locator(".slds-table.slds-table_cell-buffer.slds-table_bordered tbody tr.slds-hint-parent");

    this.fieldMappingName = "SLAExpirationDate__c"; // Example field to map

    //---------------------SELECT SOURCE DROPDOWN VALUE----------------------//

    this.fieldMappingName2 = "sendDate"; // Example source field

    this.sourceDropdown = page.locator(".slds-combobox__input-value").nth(47);

    this.sourceValueCount = page.locator("[role='option']");

    this.fieldMappingSaveButton = page.locator(".slds-m-left_x-small");

    this.closebutton = page.locator("[title='Close this window']");

    // For Validating the Field Mapping Value
    this.mappingValue = page.locator('[slot="output"]').last();

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

  async newEmailParserAction(emailParser_ActionName, object_Type,emailParserAction_Sequence,filterCriteria_fieldName) {
    // Click On Email Parser
    await this.emailParser.click();

    // Click on recent created Email Parser
    await this.page.locator("[data-label='Email Parser ID'] div.slds-truncate").first().click();

    // Zoom Out For Capturing Email Filter Actions
    await this.page.evaluate(() => {
      document.body.style.transform = "scale(55%)";
    });

    await this.page.keyboard.down("End");

    // Click on New Button Of Email Parser Actions
    //await this.page.waitForTimeout(3000);
    await this.emailParserActions.click();

    await this.page.waitForTimeout(2000);
    await this.page.reload();

    // Enter Email Parser Action Name
    await this.emailParserActionName.fill(emailParser_ActionName);

    // Click On Type Dropdown.
    await this.page.waitForTimeout(3000);
    await this.actionType.click();

    // Getting the Text of Type Option
    const typeOptionText = await this.typeCount.locator(".slds-media__body").allTextContents();
    console.log(typeOptionText);

    // Getting the Count of Source Option
    const typeOptionValue = await this.typeCount.locator(".slds-media__body").count();
    console.log(typeOptionValue);

    // Iterate Over Type Option.
    for (let i = 0; i < typeOptionValue; ++i) {
      const typeOptionValue = await this.typeCount.locator(".slds-media__body").nth(i).textContent();
 
      if (this.actionTypeOptionName.includes(typeOptionValue)) {
        await this.page.waitForTimeout(3000);
        await this.typeCount.locator(".slds-media__body").nth(i).click();
        break;
      }
    }

    // Click on email parser Lookup
    await this.emailParserLookup.click();

    // Click on recent created email parser lookup
    await this.emailParserLookupOption.click();

    // Enter Sequence Number
    await this.sequenceEmailParserAction.type(emailParserAction_Sequence);

    // Enter Object Type Name
    await this.objectType.fill(object_Type);

    // Condition to check for 'Create Record' or 'Attach To Record'
    if (this.actionTypeOptionName === "Attach To Record") {
      console.log("Attach To Record action selected. Running Save Attachment functionality.");

      // Click on the Save Attachment Checkbox
      await this.page.waitForTimeout(3000);
      await this.saveAttachments.click();

      //Click on the Attach As Dropdown
      await this.page.waitForTimeout(3000);
      await this.attachToRecord.click();

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // Updated -> 01-11-2024

      // Getting the Text Attach As Dropdown.
      const attachAsText = await this.attachAsCount.locator(".slds-media__body").allTextContents();
          console.log(attachAsText);

      // Getting the Count of Attach As Option
      const attachAsValue = await this.attachAsCount.locator(".slds-media__body").count();
      console.log(attachAsValue);

      // Iterate Over Type Option.
      for (let i = 0; i < attachAsValue; ++i) {
        const attachAsValue = await this.attachAsCount.locator(".slds-media__body").nth(i).textContent();

        
        if (this.attachAsOptionName.includes(attachAsValue)) {
          await this.page.waitForTimeout(3000);
          await this.attachAsCount.locator(".slds-media__body").nth(i).click();
          break;
        }
      }

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // Click on the Filter Criteria Text Field
    await this.filterCriteria.click();

      // Enter the Field Criteria (Object - Field Name where data wants to be saved)

      await this.filterCriteriaText.fill(filterCriteria_fieldName);
    } else if (this.actionTypeOptionName === "Create Record") {
      console.log("Create Record action selected. Skipping Save Attachment functionality.");
      // Skip the Save Attachments and Filter Criteria functionality
    }

    // Click on Save Button to Save Email Parser Action
    await this.page.waitForTimeout(2000);
    await this.saveButtonEmailAction.click();

    //-------------------After Create a Email Parser Actions --> BUILD FUNCTIONALITY------------------------//

    // Zoom Out For Capturing Email Filter Actions
    await this.page.evaluate(() => {
      document.body.style.transform = "scale(40%)";
    });

    await this.page.keyboard.down("End");

    // Click on the Email Parser Action Record to Build that Particular Record
    await this.emailParserRecordName.click();

    // Reload Page
    await this.page.waitForTimeout(2000);
    await this.page.reload();

    // Only skip the Build button click if 'Attach To Record' is selected
    if (this.actionTypeOptionName === "Create Record") {
      console.log("Performing Build functionality for Create Record action.");

      await this.buildButton.click(); // Only clicking if it's a 'Create Record' action

    } else {
      console.log("Skipping Build button click for Attach To Record action.");
    }

    //-----------------------CREATE RECORD MAPPING-----------------------//

    // Skip field mapping if it's 'Attach To Record'
    if (this.actionTypeOptionName === "Create Record") {
      await this.page.keyboard.down("End");

      // Getting the Text of Email Parser Actions
      const fieldMappingNameText = await this.fieldMappingNameCount.locator("td").allTextContents();
      console.log(fieldMappingNameText);

      // Getting the Count of Email Parser Actions
      const fieldMappingValue = await this.fieldMappingNameCount.locator("td").count();
      console.log(fieldMappingValue);

      // Iterate Over Email Parser Actions
      for (let n = 0; n < fieldMappingValue; ++n) {
        const fieldMappingValue = await this.fieldMappingNameCount.locator("td").nth(n).textContent();

        if (this.fieldMappingName.includes(fieldMappingValue)) {
          await this.page.waitForTimeout(3000);
          await this.fieldMappingNameCount.locator("td").nth(n).click();
          break;
        }
      }

      //---------------------SELECT SOURCE DROPDOWN VALUE----------------------//

      // Click on Source
      await this.sourceDropdown.click();

      // Getting the Text of Type Option
      const sourceOptionText = await this.sourceValueCount.locator(".slds-media__body").allTextContents();
      console.log(sourceOptionText);

      // Getting the Count of Source Option
      const sourceOptionValue = await this.sourceValueCount.locator(".slds-media__body").count();
      console.log(sourceOptionValue);

      // Iterate Over Type Option
      for (let s = 0; s < sourceOptionValue; ++s) {
        const sourceOptionValue = await this.sourceValueCount.locator(".slds-media__body").nth(s).textContent();

        if (this.fieldMappingName2.includes(sourceOptionValue)) {
          await this.page.keyboard.down("End");
          await this.page.waitForTimeout(3000);
          await this.sourceValueCount.locator(".slds-media__body").nth(s).click();
          break;
        }
      }

      // Click On Save Button
      await this.page.waitForTimeout(3000);
      await this.fieldMappingSaveButton.click();

      // Closing Field Mapping Page
      await this.closebutton.click();


      //Getting the Text of Mapping Value.
      await this.page.waitForTimeout(3000);
      const mappingDataText = await this.mappingValue.textContent();
      console.log(mappingDataText);

      //In Section to validate the field contins mapping value or not.
      await this.page.waitForTimeout(3000);
      await expect(this.mappingValue).not.toBeEmpty();


    } else {
      console.log("Skipping field mapping for Attach To Record action.");
    }

    //---------------------Return to EPA Record and Update Active Status----------------------//

    //To Validate the Email Parser Actions Name.
    await this.page.waitForTimeout(3000);
    await expect(this.emailParserActionNameValidation).toHaveText("Create Record for a Particular Object.");

    //To Validate the Type of Record Creation.
    await this.page.waitForTimeout(3000);
    await expect(this.typeValidation).toHaveText("Attach To Record");

    //To Validate the Attach As.
    await this.page.waitForTimeout(3000);
    await expect(this.attachAsValidation).toHaveText("File (ContentDocument)");

    //To Validate Save Attachment Checkbox.
    await this.page.waitForTimeout(3000);
    await expect(this.saveAttachmentValidation).toBeChecked();;
   
    //To Validate the Object Type.
    await this.page.waitForTimeout(3000);
    await expect(this.objectTypeValidation).toHaveText("Account");

    //To Validate the Field Criteria Value.
    await this.page.waitForTimeout(3000);
    await expect(this.filterCriteriaValidation).toHaveText("Name = 'BFD CONSTRUCTION LLC'");

    // Return to EPA Record
    await this.EPAreturn.click();

    // Edit Active Status
    await this.editButton.click();

    // Marking Active Checkbox
    await this.activeCheckBox.click();
    await this.page.waitForTimeout(3000);
    await expect(this.activeCheckBox).toBeChecked();

    // Save Active Status
    await this.saveButton.click();

    //---------------------EMAIL PARSER JOB TAB----------------------//

    // Navigating to Email Parser Job Tab
    await this.page.waitForTimeout(3000);
    await this.emailParserJob.click();

    // Open Email Parser Job Record
    await this.parserJobRecord.click();

    // Editing Replay Job Option
    await this.replayEditButton.click();

    // Enable Replay Job
    await this.page.waitForTimeout(3000);
    await this.replayJobCheckBox.click();

    // Save Replay Job
    await this.page.waitForTimeout(3000);
    await this.saveButtonReplayJob.click();

    // Switch to Related Tab
    await this.page.waitForTimeout(3000);
    await this.relatedTab.click();

    // Open Email Parser Log
    await this.emailParserLog.click();

    await this.page.pause();
  }
}

module.exports = { emailParserActions };
