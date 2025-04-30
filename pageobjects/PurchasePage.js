"use strict";

import { BaseTest } from "./BaseTest";

export class PurchasePage extends BaseTest {

  constructor(page) {
    super(page);
    this.page = page;
    this.viewprizeBtn = page.getByText('View Prize');
    this.toastcloseBtn = page.locator('.toast-close');
    // this.entriesremainingTitle = page.locator('.entryRemaining_banner');
    // this.entertowinBtn = page.getByRole('button').filter({ hasText: 'Enter to Win' });
    this.entertowinBtn = page.getByText('Enter to Win').last();
    this.nextprizeBtn = page.getByText('NEXT PRIZE');
    this.popupCloseBtn = page.getByRole('button').filter({ hasText: "LET'S GO" });
    this.nextentryBtn = page.getByText('NEXT ENTRY');
  }

  async checkPopUp() {
    if (await this.popupCloseBtn.isVisible()) {
      await this.popupCloseBtn.hover();
      await this.popupCloseBtn.focus();
      await this.popupCloseBtn.click();
    }
  }

  async launchWeekly(url = '/weekly-grand-prize') {
    await this.goto(url);
  }

  async launch(url = 'https://pch.com') {
    await this.goto(url);
  }

  async submitSuperPrize() {
    await this.launch();
    await this.viewprizeBtn.nth(0).waitFor();
    await this.viewprizeBtn.nth(0).hover();
    await this.viewprizeBtn.nth(0).click({ force: true });
    //await this.entriesremainingTitle.waitFor();
    await this.page.waitForTimeout(5000);
    const isVisible = await this.nextprizeBtn.isVisible();

    if (!isVisible) {
      await this.entertowinBtn.hover();
      await this.entertowinBtn.click();
      await this.page.waitForTimeout(5000)
    }


  }

  async submitOtherPrizes() {
    await this.launchWeekly();
    const count = await this.nextPrizesCount();

    for (let i = 0; i < count; i++) {
      await this.viewprizeBtn.nth(i).waitFor();
      await this.viewprizeBtn.nth(i).hover();
      await this.viewprizeBtn.nth(i).click();
      await this.page.waitForTimeout(5000);
      const isVisible = await this.nextprizeBtn.isVisible();

      if (!isVisible) {
        await this.entertowinBtn.hover();
        await this.entertowinBtn.click();
        await this.page.waitForTimeout(5000);
      }
      await this.launchWeekly();
    }
  }

  async nextPrizesCount() {
    await this.viewprizeBtn.nth(1).waitFor();
    return (await this.viewprizeBtn.all()).length;
  }

  async isSuperPrizeComplete() {
    let result = false;
    await this.launch();
    await this.viewprizeBtn.nth(0).waitFor();
    await this.viewprizeBtn.nth(0).hover();
    await this.viewprizeBtn.nth(0).click();
    await this.page.waitForTimeout(5000);
    const isVisible = await this.nextprizeBtn.isVisible();

    if (isVisible) result = true;
    console.log('Super Next Prize button: ' + result);

    return result;
  }

  async isOtherPrizesComplete() {
    await this.launchWeekly();
    const count = await this.nextPrizesCount();
    let result = 0;

    for (let i = 0; i < count; i++) {
      await this.viewprizeBtn.nth(i).waitFor();
      await this.viewprizeBtn.nth(i).hover();
      await this.viewprizeBtn.nth(i).click();
      await this.page.waitForTimeout(3000);
      const isVisible = await this.nextprizeBtn.isVisible();
      if (isVisible) result = result + 1;
      await this.launchWeekly();
    }
    console.log('Weekly Next Prize buttons: ' + result);
    return (count == result);
  }

}