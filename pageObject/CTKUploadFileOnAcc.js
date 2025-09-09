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
    await this.page.setInputFiles("input[type='file'][name='fileInput']", "C:/Users/GautamPaswan/Downloads/Test attachment file.eml");
    await this.clickDoneButton.click();

    console.log("File uploaded successfully ");

      // Step 2: Click Email Parser Jobs
    await this.page.click("//span[text()='Email Parser Jobs']");
    
    // await this.page.click("[title='Select a List View: Email Parser Jobs']");
    // await this.page.getByText('All', { exact: true }).click();

    // Step 3: Click job by title
    await this.page.locator("[data-label='Email Parser Job Name']").nth(0).click();
    await this.clickRelatedButtonEmailJob.click();


    // Step 4: Click Email Parser Log → handle new tab
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"), // wait for new tab
      this.page.click("[title='Email Parser Log']"),
    ]);

    // Step 5: Work with the new tab
    await newPage.waitForLoadState();
    const tabTitle = await newPage.title();
    console.log("New tab opened with title:", tabTitle);

    // // Example validation
    // const logVisible = await newPage.locator("[style='word-wrap: break-word; white-space: pre-wrap;']").isVisible();
    // console.log("Log details visible:", logVisible);

    // // 👉 Switch back to original tab if needed
    // await this.page.bringToFront();


    // Step 1: Get the full text from the element
const logText = await newPage.locator(
  "[style='word-wrap: break-word; white-space: pre-wrap;']"
).innerText();

console.log("Extracted log text:\n", logText);

// Step 2: Split log into lines
const lines = logText.split("\n");

// Step 3: Find lines with Criteria Met
let failedLines = [];
let passedLines = [];

lines.forEach((line, index) => {
  const normalized = line.trim().toLowerCase();

  if (normalized === "criteria met : false") {
    failedLines.push(index + 1); // record line number
  } else if (normalized === "criteria met : true") {
    passedLines.push(index + 1);
  }
});

// Step 4: Check results
if (failedLines.length > 0) {
  console.error(`❌ Test Failed: Found 'Criteria Met : false' at line(s): ${failedLines.join(", ")}`);
  throw new Error("Test failed due to 'Criteria Met : false'");
} else if (passedLines.length > 0) {
  console.log("✅ Test Passed: All 'Criteria Met' values are true");
} else {
  console.warn("⚠️ No 'Criteria Met' lines found in log — check locator or log output.");
}
  }

}
module.exports = {CTKUploadFileOnAcc};