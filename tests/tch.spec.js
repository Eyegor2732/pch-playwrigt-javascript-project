"use strict"

import { expect } from '@playwright/test';
import { PageObjectsManager } from '../pageobjects/PageObjectManager.js';
import { customtest as test } from '../data/data.js';

test.afterEach('Tear down each', async ({ page }) => {
  if (!page.isClosed()) await page.close();
});

test.afterAll('Tear down all', async ({ browser }) => {
  if (browser.isConnected()) await browser.close();
});

test('PCH Grand Prize And Weekly Prizes',
  {
    annotation: {
      type: 'End to End',
      description: 'https://pch.com',
    }
  },
  async ({ page, testData }) => {
    const poManager = new PageObjectsManager(page);
    const loginPage = poManager.getLoginPage();
    const purchasePage = poManager.getPurchasePage();
    const email = testData.email;
    const password = testData.password;
    const afterButtonColor = testData.afterButtonColor;

    // ========== Launch to the main PCH page and Log In
    await loginPage.launch();
    await loginPage.signIn(email, password);
    expect(await loginPage.signText()).toContain("Sign Out");

    // ========== Enter to sweepstake for Super prize
    await purchasePage.submitSuperPrize();
    expect.soft(await purchasePage.isSuperPrizeComplete()).toBeTruthy;

    // ========== Enter to sweepstake for all prizes
    const isOtherPrizesComplete = await purchasePage.submitOtherPrizes(afterButtonColor);
    expect.soft(isOtherPrizesComplete).toBeTruthy;

  });