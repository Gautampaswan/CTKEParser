//Using this File we will covered the 'Email Filter' Scenario for 'Header' source test case.

const { test, expect } = require('@playwright/test');

const { loginPage } = require('../pageObject/loginPageHeader'); 
const { emailParser } = require('../pageObject/emailParserHeader');
const { emailFilter } = require('../pageObject/emailFilterHeader');
const { fieldParser } = require('../pageObject/fieldParserHeader');
const { emailParserActions } = require('../pageObject/emailParserActionsHeader');

test('Test the Functionality Related to Header Filter', async ({ page }) => {
  
    //Creating a login page using constructor
    const login_Page = new loginPage(page);

    //Calling goto method from the loginPage class
    await login_Page.goto();
    
    const user_name = 'sumit.arya@resilient-unicorn-4jj5tk.com';
    const pass_word = 'Developer@149';

    //Calling Valid Login Method from login Page Class
    await login_Page.validLogin(user_name, pass_word);

    //Waiting for all API's call to be made
    await page.waitForLoadState('networkidle');

    //----------------------------------------------EMAIL PARSER------------------------------------------------//

    //Creating a New Email Parser using constructorsss
    const email_Parser = new emailParser(page);

    //Calling newEmailParser Method from emailParser Class
    await email_Parser.newEmailParser(expect);

    //Waiting for all API's call to be made
    await page.waitForLoadState('networkidle');

    //----------------------------------------------EMAIL FILTER-------------------------------------------------//

    const email_Filter = new emailFilter(page);

    const email_Filter_Name = 'Header Verification';
    const filter_Value = 'Test Attachment For CTK Email Parser.';
    const email_Sequence = '1';

    //Calling newEmailFilter Method from emailFilter Class
    await email_Filter.newEmailFilter(email_Filter_Name, filter_Value, email_Sequence);

  
    //----------------------------------------------FIELD PARSER----------------------------------------------//

    const field_Parser = new fieldParser(page);

    const reference_Name = 'lastName' //Change as per the field_api_name from salesforce

    const header_Name = 'Subject' //Change as per the requirement

    //Calling newFieldParser Method from fieldParser Class
    await field_Parser.newFieldParser(reference_Name, header_Name);

    //-------------------------------------------BUILD => FIELD PARSER----------------------------------------//
    
    //const range_StartValue = `,`;//Need to Change as per Requirement
    
    //const range_EndValue = `.`;//Need to Change as per Requirement

      const start_Position = '1' //Need to Change as per Requirement

      const start_Position_Character = '12' //Need to Change as per Requirement

    //if Used above const variable

    //await field_Parser.newBuildFieldParser(range_StartValue, range_EndValue); 
    await field_Parser.newBuildFieldParser(start_Position, start_Position_Character);


    //--------------------------------------------EMAIL PARSER ACTIONS---------------------------------------//

    const email_Parser_Actions = new emailParserActions(page);

    const emailParserAction_Sequence = '1';

    const emailParser_ActionName = 'Create Record for a Particular Object.'; //also change value with => const emailActionName = 'create record for email parser'; //Need to change as per requirement
    
    const object_Type = 'Contact' //Need to change as per requirement (Object Name)
    
    //Calling newEmailParserActions Method from emailParserActions Class
    await email_Parser_Actions.newEmailParserAction(emailParser_ActionName, object_Type, emailParserAction_Sequence);

    });

