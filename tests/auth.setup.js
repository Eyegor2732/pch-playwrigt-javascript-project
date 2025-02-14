import { test as setup, expect } from '@playwright/test';
import { PageObjectsManager } from '../pageobjects/PageObjectManager.js';
// import user from '../.auth/user.json'
// import fs from 'fs'


const authFile = './.auth/user.json';

setup('Authenticate by UI', async ({ page }, testInfo) => {

    const poManager = new PageObjectsManager(page);
    const loginPage = poManager.getLoginPage();
    const email = testInfo.project.use.email;
    const password = testInfo.project.use.password;

    await loginPage.launch();
    await loginPage.signIn(email, password);
    expect(await loginPage.signText()).toContain("Sign Out");

    await page.context().storageState({ path: authFile });

});