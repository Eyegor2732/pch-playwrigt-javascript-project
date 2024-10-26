"use strict";

const { BaseTest } = require("./BaseTest");

class LoginPage extends BaseTest{
    
    constructor(page) {
        super(page);
        this.page = page;
        this.popupCloseBtn = page.locator('.bx-close-inside');
        this.signinLink = page.getByRole('link', { name: 'Sign In' });
        this.signoutLink = page.getByRole('link', { name: 'Sign Out' });
        this.emailInput = page.getByPlaceholder('Email Address');
        this.continueBtn = page.getByText('CONTINUE');
        this.passwordInput = page.getByPlaceholder('Verify Password');
        this.signinBtn = page.locator('.btn.btn--login');
        this.letsgoBtn = page.getByText("LET'S GO");
    }
    
    async launchAndSignIn() {
        await this.setViewport(1700, 1200);
        await this.goto('/weekly-grand-prize');
        await this.checkPopUpAd();
        await this.signinLink.click();
        await this.emailInput.pressSequentially(process.env.EMAIL, {delay: 100});
        await this.continueBtn.click();
        await this.passwordInput.pressSequentially(process.env.PASSWORD, {delay: 100});
        await this.signinBtn.click();
        await this.letsgoBtn.click();
    }

    async launch() {
        await this.setViewport(1700, 1200);
        await this.goto('/weekly-grand-prize');
    }

    async signIn() {
        if(await this.signinLink.isEnabled()) {
            await this.signinLink.click();
            await this.emailInput.pressSequentially(process.env.EMAIL, {delay: 100});
            await this.continueBtn.click();
            await this.passwordInput.pressSequentially(process.env.PASSWORD, {delay: 100});
            await this.signinBtn.click();
            await this.letsgoBtn.click();
        }
    }

    async checkPopUpAd() {
        if (await this.popupCloseBtn.isVisible()) {
            await this.popupCloseBtn.click();
          }
    }

    async signText() {
        if(await this.signinLink.isVisible()) {
            return (await this.signinLink.textContent());
        }
        else if(await this.signoutLink.isVisible) {
            return (await this.signoutLink.textContent()); 
        }
        else {
            return ("No Sign In/Out link"); 
        }
    }

}

module.exports = {LoginPage};