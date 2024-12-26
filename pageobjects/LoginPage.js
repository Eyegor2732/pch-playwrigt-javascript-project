"use strict";

import { BaseTest } from "./BaseTest";

export class LoginPage extends BaseTest {

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

    async launchWeekly(url = '/weekly-grand-prize') {
        await this.goto(url);
    }

    async launch(url = 'https://pch.com') {
        await this.goto(url);
    }

    async signIn(email, password) {
        if (await this.signinLink.isEnabled()) {
            await this.signinLink.hover();
            await this.signinLink.click();
            await this.emailInput.hover;
            await this.emailInput.pressSequentially(email, { delay: 100 });
            await this.continueBtn.hover();
            await this.continueBtn.click();
            await this.passwordInput.hover;
            await this.passwordInput.pressSequentially(password, { delay: 100 });
            await this.signinBtn.hover();
            await this.signinBtn.click();
            await this.letsgoBtn.hover();
            await this.letsgoBtn.click();
        }
    }

    async checkPopUpAd() {
        if (await this.popupCloseBtn.isVisible()) {
            await this.popupCloseBtn.hover();
            await this.popupCloseBtn.click();
        }
    }

    async signText() {
        if (await this.signinLink.isVisible()) {
            return (await this.signinLink.textContent());
        }
        else if (await this.signoutLink.isVisible) {
            return (await this.signoutLink.textContent());
        }
        else {
            return ("No Sign In/Out link");
        }
    }

}