"use strict"

import { expect } from '@playwright/test';
import { PageObjectsManager } from '../pageobjects/PageObjectManager';
import { customtest } from '../data/data.js';

customtest.afterEach('Tear down each', async ({ page }) => {
  if (!page.isClosed()) await page.close();
});

customtest.afterAll('Tear down all', async ({ browser }) => {
  if (browser.isConnected()) await browser.close();
});

customtest('Weekly Grand Prize', async ({ page, testData }) => {
  const poManager = new PageObjectsManager(page);
  const loginPage = poManager.getLoginPage();
  const purchasePage = poManager.getPurchasePage();

  // ========== Launch to the weekly sweepstakes page and Log In
  await loginPage.launch();
  await loginPage.signIn(testData.email, testData.password);
  expect(await loginPage.signText()).toContain("Sign Out");

  // ========== Enter to sweepstake for the this week prize
  await purchasePage.submitThisweekPrize();
  expect(await purchasePage.thisweekBtnText()).toContain("GET MORE");

  // ========== Enter to sweepstake for all other prizes, include Grand Prize
  const nextPrizesCount = await purchasePage.nextPrizesCount();
  await purchasePage.submitOtherPrizes();
  const nextPrizesLinkedCount = await purchasePage.nextPrizesLinkedCount();
  expect(nextPrizesLinkedCount).toEqual(nextPrizesCount - 1);
  expect(await purchasePage.isGrandPrizeComplete()).toBeTruthy();
});




