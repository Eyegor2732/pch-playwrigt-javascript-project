"use strict"

import { expect } from '@playwright/test';
import { PageObjectsManager } from '../pageobjects/PageObjectManager.js';
import { customtest as test } from '../data/data.js';
import fs from "node:fs/promises";

test.describe('End To End', () => {

  test.afterAll('Tear down all', async ({ browser, testData }) => {
    // erase all data from authFile
    await fs.truncate(testData.authFile, 0);

    if (await browser.isConnected()) await browser.close();
  });

  test('Super Prize',
    {
      annotation: {
        type: 'Super Prize Only',
        description: 'https://pch.com',
      }
    },
    async ({ page }) => {
      const poManager = new PageObjectsManager(page);
      const purchasePage = poManager.getPurchasePage();

      // ========== Enter to sweepstake for Super prize
      await purchasePage.submitSuperPrize();
      expect(await purchasePage.isSuperPrizeComplete()).toBeTruthy;

    });

  test('Weekly Prizes',
    {
      annotation: {
        type: 'All Weekly Prizes',
        description: 'https://rewards.pch.com/weekly-grand-prize',
      }
    },
    async ({ page, testData }) => {
      const poManager = new PageObjectsManager(page);
      const purchasePage = poManager.getPurchasePage();
      const afterButtonColor = testData.afterButtonColor;

      // ========== Enter to sweepstake for all weekly prizes
      const isOtherPrizesComplete = await purchasePage.submitOtherPrizes(afterButtonColor);
      expect(isOtherPrizesComplete).toBeTruthy;

    });

});