const { expect } = require('@playwright/test');


class CTKUploadFileOnAcc {

    constructor(page) {
        this.page = page;
        
        this.appLauncher = page.locator(".slds-icon-waffle");
    
        this.searchBar = page.locator("[placeholder='Search apps and items...']");
    
        this.CTKEmail = page.locator("//p[text()=' Email Parser']");
        this.clickCTKEmailParser = page.locator("//span[text()= 'CTK Email Parser Setup']");

        this.clickAccount = page.locator("//b[text()='Account']");
        this.clickNewButton = page.getByRole('button', { name: 'New' });
        this.fillAccountName = page.locator("[name='Name']");
        this.clickSaveButton = page.getByRole('button', { name: 'Save', exact: true });
        //this.clickAccountname = page.locator("//span[text()='Bill']");
        this.clickRelatedButton = page.locator("//a[text() = 'Related']");
        this.clickRelatedButtonEmailJob = page.getByRole('tab', { name: 'Related' });
        this.clickUploadButton = page.locator("//span[text() = 'Upload Files']");
        this.clickDoneButton = page.getByRole('button', { name: 'Done' });
       


    }

    async UploadFileOnAccount() {
    await this.appLauncher.click();
    await this.searchBar.click();
    await this.page.locator('[placeholder="Search apps and items..."]').fill("Account", { delay: 100 });
    await this.clickAccount.click();
    await this.clickNewButton.click();
    await this.fillAccountName.fill("Bill");
    await this.clickSaveButton.click();
    await this.clickRelatedButton.click();

    // scroll down if needed
    for (let i = 0; i < 2; i++) {
        await this.page.mouse.wheel(0, 900);
        await this.page.waitForTimeout(120);
    }

    // 🔑 Directly upload file into hidden input[type=file]
    await this.page.setInputFiles("input[type='file'][name='fileInput']", "C:/Users/GautamPaswan/Downloads/testing table.eml");
    await this.page.waitForTimeout(5000);
    await this.clickDoneButton.click();
    await this.page.waitForTimeout(5000);


    console.log("File uploaded successfully ");

      // Step 2: Click Email Parser Jobs
    await this.page.click("//span[text()='Email Parser Jobs']");
    
    await this.page.click("[title='Select a List View: Email Parser Jobs']");
    await this.page.getByText('All', { exact: true }).click();

    // Step 3: Click job by title
    //await this.page.locator("[data-label='Email Parser Job Name']").last().click();
    //await this.page.locator("[data-label='Email Parser Job Name']").nth(-1).click();
   await this.page.locator("[data-label='Email Parser Job Name'] [class='slds-truncate']").nth(1).hover({ timeout: 5000 });
   await this.page.locator("[data-label='Email Parser Job Name'] [class='slds-truncate']").nth(1).click({ timeout: 5000 });
   //[data-label='Email Parser Job Name'] [class='slds-truncate']
   //[data-label='Email Parser Job Name']



    await this.clickRelatedButtonEmailJob.click();


    // Step 4: Click Email Parser Log → handle new tab
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"), // wait for new tab
      this.page.click("[title='Email Parser Log']"),
    ]);

//     // Step 5: Work with the new tab
//     await newPage.waitForLoadState();
//     const tabTitle = await newPage.title();
//     console.log("New tab opened with title:", tabTitle);

//     // // Example validation
//     // const logVisible = await newPage.locator("[style='word-wrap: break-word; white-space: pre-wrap;']").isVisible();
//     // console.log("Log details visible:", logVisible);

//     // // 👉 Switch back to original tab if needed
//     // await this.page.bringToFront();


//     // Step 1: Get the full text from the element
// const logText = await newPage.locator(
//   "[style='word-wrap: break-word; white-space: pre-wrap;']"
// ).innerText();

// console.log("Extracted log text:\n", logText);

// // Step 2: Split log into lines
// const lines = logText.split("\n");

// // Step 3: Check for "Parsed Value : testing table"
// let matchedLines = [];

// lines.forEach((line, index) => {
//   if (line.trim().toLowerCase() === "parsed value : testing table") {
//     matchedLines.push(index + 1); // record line number
//   }
// });

// // Step 4: Check results
// if (matchedLines.length > 0) {
//   console.log(`✅ Test Passed: Found 'Parsed Value : testing table' at line(s): ${matchedLines.join(", ")}`);
// } else {
//   console.error("❌ Test Failed: 'Parsed Value : testing table' not found in log");
//   throw new Error("Test failed because expected 'Parsed Value : testing table' was not found");
// }
  }

}
module.exports = {CTKUploadFileOnAcc};