
const { test, expect } = require('@playwright/test');

const { loginPage } = require('../pageObject/loginPage_To');
const {CTKEmailParserSetUp} = require('../pageObject/CTKEmailParserSetUp');
const { emailParser } = require('../pageObject/emailParser_To');
const { emailFilter } = require('../pageObject/emailFilter_To');
const { fieldParser } = require('../pageObject/fieldParser_To');
const { emailParserActions } = require('../pageObject/emailParserActions_To');

test('Test the functionality related to - TO Filter With enabled Contact Ingestion', async ({ page }) => {
  
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

    const ctkEmailParserSetUp = new CTKEmailParserSetUp(page);
    await ctkEmailParserSetUp.EmailSetUp();

    //----------------------------------------------EMAIL PARSER------------------------------------------------//

    //Creating a New Email Parser using constructorsss
    const email_Parser = new emailParser(page);

    //Calling newEmailParser Method from emailParser Class
    await email_Parser.newEmailParser(expect);

    //Waiting for all API's call to be made
    await page.waitForLoadState('networkidle');

    //----------------------------------------------EMAIL FILTER-------------------------------------------------//

    const email_Filter = new emailFilter(page);

    const email_Filter_Name = 'Domain_Verification';
    const filter_Value = 'salesforce.com';
    const email_Sequence = '1';

    //Calling newEmailFilter Method from emailFilter Class
    await email_Filter.newEmailFilter(email_Filter_Name, filter_Value, email_Sequence);

  
    //----------------------------------------------FIELD PARSER----------------------------------------------//

    const field_Parser = new fieldParser(page);

    const reference_Name = 'email' //Change as per the field_api_name from salesforce

    //Calling newFieldParser Method from fieldParser Class
    await field_Parser.newFieldParser(reference_Name);

    //-------------------------------------------BUILD => FIELD PARSER----------------------------------------//

    //const range_StartValue = `,`;//Need to Change as per Requirement

    const start_Position = '0';//Need to Change as per Requirement

    const start_PositionCharacterNo  = '0';//Need to Change as per Requirement
    
    const range_EndValue = '@';//Need to Change as per Requirement

    await field_Parser.newBuildFieldParser(start_Position, start_PositionCharacterNo, range_EndValue);


    //--------------------------------------------EMAIL PARSER ACTIONS---------------------------------------//

    const email_Parser_Actions = new emailParserActions(page);

    const emailParserAction_Sequence = '1';

    const emailParser_ActionName = 'Create Record for a Particular Object.'; //also change value with => const emailActionName = 'create record for email parser'; //Need to change as per requirement
    
    const object_Type = 'Contact' //Need to change as per requirement (Object Name)
    
    //Calling newEmailParserActions Method from emailParserActions Class
    
    await email_Parser_Actions.newEmailParserAction(emailParser_ActionName, object_Type, emailParserAction_Sequence);

    });

