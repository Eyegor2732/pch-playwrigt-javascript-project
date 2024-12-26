"use strict";

import { BaseTest } from "./BaseTest";

export class PurchasePage extends BaseTest {

  constructor(page) {
    super(page);
    this.page = page;
    this.viewprizeBtn = page.locator('.view-prize-btn');
    this.toastcloseBtn = page.locator('.toast-close');
    this.entriesremainingTitle = page.locator('span[class="num-remaining"]');
    this.entertowinBtn = page.getByRole('button').filter({ hasText: 'Enter To Win' });
    this.thisweekBtn = page.locator('.button-link');
    this.popupCloseBtn = page.getByRole('button').filter({ hasText: "LET'S GO" });
    this.enteredAlreadyTitle = page.locator('.left-contents-title');
  }

  async checkPopUp() {
    if (await this.popupCloseBtn.isVisible()) {
      await this.popupCloseBtn.hover();
      await this.popupCloseBtn.focus();
      await this.popupCloseBtn.dblclick();
    }
  }

  async launchWeekly(url = '/weekly-grand-prize') {
    await this.goto(url);
  }

  async launch(url = 'https://pch.com') {
    await this.goto(url);
  }

  async submitSuperPrize() {
    await this.checkPopUp();
    await this.viewprizeBtn.nth(0).waitFor();
    await this.viewprizeBtn.nth(0).hover();
    await this.viewprizeBtn.nth(0).click();
    await this.entriesremainingTitle.waitFor();
    if (((await this.entriesremainingTitle.innerText()).trim().split(" ")[0]) != "0") {
      await this.enterLoop();
    }
    await this.checkPopUp();
    // await this.launchWeekly();
  }

  async submitOtherPrizes(afterButtonColor) {
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
        await this.goback();
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
    while (parseInt((await this.entriesremainingTitle.innerHTML()).trim().split(" ")[0]) != 1) {
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
    await this.launch();
    await this.viewprizeBtn.nth(0).waitFor();
    await this.viewprizeBtn.nth(0).hover();
    await this.viewprizeBtn.nth(0).click();
    await this.entriesremainingTitle.waitFor();
    if ((await this.entriesremainingTitle.innerText()).trim().split(" ")[0] == "0") {
      result = true;
    }
    await this.launchWeekly();
    return result;
  }

}