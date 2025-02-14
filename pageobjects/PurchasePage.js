"use strict";

import { BaseTest } from "./BaseTest";

export class PurchasePage extends BaseTest {

  constructor(page) {
    super(page);
    this.page = page;
    this.viewprizeBtn = page.getByText('VIEW PRIZE');
    this.toastcloseBtn = page.locator('.toast-close');
    this.entriesremainingTitle = page.locator('.entryRemaining_banner');
    this.entertowinBtn = page.getByRole('button').filter({ hasText: 'Enter To Win' });
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
    await this.checkPopUp();
    await this.viewprizeBtn.nth(0).waitFor();
    await this.viewprizeBtn.nth(0).hover();
    await this.viewprizeBtn.nth(0).click();
    await this.entriesremainingTitle.waitFor();

    if (!(await this.nextentryBtn.isVisible())) {
      await this.enterLoop();
    }

    await this.launch();//await this.goback();
    await this.checkPopUp();
    // await this.launchWeekly();
  }

  async submitOtherPrizes(afterButtonColor) {
    await this.launchWeekly();
    let result = 0;
    const count = await this.nextPrizesCount();

    for (let i = 0; i < count; i++) {
      await this.checkPopUp();
      await this.viewprizeBtn.nth(i).waitFor();

      let backgroundColor = await this.viewprizeBtn.nth(i).evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('background-color');
      });

      if (backgroundColor != afterButtonColor) {
        await this.viewprizeBtn.nth(i).hover();
        await this.viewprizeBtn.nth(i).click();
        await this.enterLoop();
        await this.launchWeekly();
      }

      backgroundColor = await this.viewprizeBtn.nth(i).evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('background-color');
      });

      if (backgroundColor == afterButtonColor) {
        result++;
      }
    }
    await this.checkPopUp();
    return count == result;
  }

  async enterLoop() {
    await this.entriesremainingTitle.waitFor();
    while ((await this.entriesremainingTitle.textContent()).trim().split(" ")[0] != "1") {
      await this.entertowinBtn.hover();
      await this.entertowinBtn.click();
      await this.toastcloseBtn.hover();
      await this.toastcloseBtn.click();
    }
  }

  async nextPrizesCount() {
    await this.viewprizeBtn.nth(1).waitFor();
    return (await this.viewprizeBtn.all()).length;
  }

  async isSuperPrizeComplete() {
    let result = false;
    await this.viewprizeBtn.nth(0).waitFor();
    await this.viewprizeBtn.nth(0).hover();
    await this.viewprizeBtn.nth(0).click();
    await this.entriesremainingTitle.waitFor();

    if (await this.nextentryBtn.isVisible()) {
      result = true;
    }
    return result;
  }

}