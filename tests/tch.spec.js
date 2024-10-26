"use strict"

const {test, expect} = require('@playwright/test');
const {PageObjectsManager} = require('../pageobjects/PageObjectManager');

test.afterEach('Tear down each', async ({page}) => {
  if(!page.isClosed()) await page.close();
}); 

test.afterAll('Tear down all', async ({browser}) => {
  if(browser.isConnected()) await browser.close(); 
}); 

test('Weekly Grand Prize', async ({ page }) => {
  const poManager = new PageObjectsManager(page);
  const loginPage = poManager.getLoginPage();
  const purchasePage = poManager.getPurchasePage();

  // ========== Launch to the weekly sweepstakes page and Log In
  await loginPage.launch();
  await loginPage.signIn();
  expect(await loginPage.signText()).toContain("Sign Out");

  // ========== Enter to sweepstake for the this week prize
  expect(await purchasePage.thisweekBtnText()).toContain("LET'S GO");
  await purchasePage.submitThisweekPrize();
  expect(await purchasePage.thisweekBtnText()).toContain("GET MORE");
  
  // ========== Enter to sweepstake for all other prizes, include Grand Prize
  const nextPrizesCount = await purchasePage.nextPrizesCount();
  await purchasePage.submitOtherPrizes();
  const nextPrizesLinkedCount = await purchasePage.nextPrizesLinkedCount();
  expect(nextPrizesLinkedCount).toEqual(nextPrizesCount - 1);
  expect(await purchasePage.isGrandPrizeComplete()).toBeTruthy();
});




