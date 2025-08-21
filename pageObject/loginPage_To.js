class loginPage {
    
    constructor(page) {

        this.page = page;
        
        this.username = page.locator("input#username");

        this.password = page.locator("input#password");
        
        this.Login = page.locator("input#Login");
    }

    async validLogin(user_name, pass_word) {
        
        //Enter UserName
        await this.username.fill(user_name);

        //Enter Password
        await this.password.fill(pass_word);

        //Click Login
        await this.Login.click();
    }

    async goto() {

        await this.page.goto("https://login.salesforce.com/");
    }
}

module.exports = { loginPage };