
const { test, expect } = require("@playwright/test");

const { loginPage } = require("../pageObject/loginPageAttachment");
const { emailParser } = require("../pageObject/emailParserAttachment");
const { emailFilter } = require("../pageObject/emailFilterAttachment");
const { fieldParser } = require("../pageObject/fieldParserAttachment");
const { emailParserActions } = require("../pageObject/emailParserActionAttachment");

test("Test the Functionality Related to Attachment", async ({ page }) => {
  //Creating a login page using constructor
  const login_Page = new loginPage(page);

  //Calling goto method from the loginPage class
  await login_Page.goto();

  const user_name = "sumit.arya@resilient-unicorn-4jj5tk.com";
  const pass_word = "Developer@149";

  //Calling Valid Login Method from login Page Class
  await login_Page.validLogin(user_name, pass_word);

  //Waiting for all API's call to be made
  await page.waitForLoadState("networkidle");

  //----------------------------------------------EMAIL PARSER------------------------------------------------//

  //Creating a New Email Parser using constructorsss
  const email_Parser = new emailParser(page);

  //Calling newEmailParser Method from emailParser Class
  await email_Parser.newEmailParser(expect);

  //Waiting for all API's call to be made
  await page.waitForLoadState("networkidle");

  //----------------------------------------------EMAIL FILTER-------------------------------------------------//

  const email_Filter = new emailFilter(page);

  const email_Filter_Name = "Attachment Verification";

  const email_Sequence = "1";

  //Calling newEmailFilter Method from emailFilter Class
    await email_Filter.newEmailFilter(email_Filter_Name, email_Sequence);

  //----------------------------------------------FIELD PARSER----------------------------------------------//

  const field_Parser = new fieldParser(page);

  const reference_Name = "Name"; //Change as per the field_api_name from salesforce

  const header_Name = "Subject"; //Change as per the requirement

  //Calling newFieldParser Method from fieldParser Class
  await field_Parser.newFieldParser(reference_Name, header_Name);

  //-------------------------------------------BUILD => FIELD PARSER----------------------------------------//
  await field_Parser.newBuildFieldParser();

  //--------------------------------------------EMAIL PARSER ACTIONS---------------------------------------//

  const email_Parser_Actions = new emailParserActions(page);

  const emailParserAction_Sequence = "1";

  const emailParser_ActionName = "Create Record for a Particular Object."; //also change value with => const emailActionName = 'create record for email parser'; //Need to change as per requirement

  const object_Type = "Account"; //Need to change as per requirement (Object Name)

  const filterCriteria_fieldName = "Name = 'sForce'"; //Need to change as per requirement.

  //Calling newEmailParserActions Method from emailParserActions Class
  await email_Parser_Actions.newEmailParserAction(emailParser_ActionName,object_Type,emailParserAction_Sequence,filterCriteria_fieldName);
  
});
