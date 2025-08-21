
const { test, expect } = require('@playwright/test');

const { loginPage } = require('../pageObject/loginPageEmailSendDate');
const { emailParser } = require('../pageObject/emailParserEmailSendDate');
const { emailFilter } = require('../pageObject/emailFilterEmailSendDate');
const { fieldParser} = require('../pageObject/fieldParserEmailSendDate');
const { fieldParser_2 } = require('../pageObject/fieldParserEmailSendDate2');
const { EmailParserActions } = require('../pageObject/emailParserActionEmailSendDate');

test('Tested the functionality related to - Email Send Date', async ({ page }) => {
  
    //Creating a login page using constructor
    const login_Page = new loginPage(page);

    //Calling goto method from the loginPage class
    await login_Page.goto();
    
    const user_name = "sumit.arya@resilient-unicorn-4jj5tk.com";
    const pass_word = "Developer@149";

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

    const email_Filter_Name = 'Email Send Date - Verification';
    const filter_Value = 'cynoteck.com';
    const email_Sequence = '1';

    //Calling newEmailFilter Method from emailFilter Class
    await email_Filter.newEmailFilter(email_Filter_Name, filter_Value, email_Sequence);

    //----------------------------------------------FIELD PARSER----------------------------------------------//

    const field_Parser = new fieldParser(page);

    const reference_Name = 'lastName' //Change as per the field_api_name from salesforce

    //Calling newFieldParser Method from fieldParser Class
    await field_Parser.newFieldParser(reference_Name);

    //-------------------------------------------BUILD => FIELD PARSER----------------------------------------//

   await field_Parser.newBuildFieldParser();

  
    //----------------------------------------------FIELD PARSER_2----------------------------------------------//

    const field_Parser_2 = new fieldParser_2(page);

    const reference_Name_2 = 'sendDate' //Change as per the field_api_name from salesforce

    //Calling newFieldParser Method from fieldParser Class
    await field_Parser_2.newFieldParser(reference_Name_2);

   //-------------------------------------------BUILD => FIELD PARSER----------------------------------------//

    await field_Parser_2.newBuildFieldParser_2();

    //--------------------------------------------EMAIL PARSER ACTIONS---------------------------------------//

    const email_Parser_Actions = new EmailParserActions(page);

    const emailParserAction_Sequence = '1';

    const emailParser_ActionName = 'Create Record for a Particular Object.'; //also change value with => const emailActionName = 'create record for email parser'; //Need to change as per requirement
    
    const filterCriteria_fieldName = "Name = 'sForce'"; //Need to change as per requirement

    const object_Type = 'Account' //Need to change as per requirement (Object Name)
    
    //Calling newEmailParserActions Method from emailParserActions Class
    await email_Parser_Actions.newEmailParserAction(emailParser_ActionName, object_Type, emailParserAction_Sequence, filterCriteria_fieldName);

    });

