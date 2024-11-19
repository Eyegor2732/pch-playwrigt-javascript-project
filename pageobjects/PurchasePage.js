"use strict";

import { BaseTest } from "./BaseTest";

export class PurchasePage extends BaseTest {

  constructor(page) {
    super(page);
    this.page = page;
    this.viewprizeBtn = page.locator('//div[contains(@class,"view_prize-btn")]');
    this.viewgrandprizeBtn = page.locator('//div[@class="view_prize-btn "]');
    this.viewprizelinkedBtn = page.locator('div[class="view_prize-btn with-link"]');
    this.toastcloseBtn = page.locator('.toast-close');
    this.entriesremainingTitle = page.locator('span[class="num-remaining"]');
    this.entertowinBtn = page.getByRole('button').filter({ hasText: 'Enter To Win' });
    this.thisweekBtn = page.locator('.button-link');
    this.grandprizedisabledBtn = page.locator('.button-link.disabled-cta');
    this.popupCloseBtn = page.getByRole('button').filter({ hasText: "LET'S GO" });
  }

  async submitThisweekPrize() {
    if ((await this.thisweekBtn.textContent()).includes("LET'S GO")) {
      await this.checkPopUp();
      await this.thisweekBtn.hover();
      await this.thisweekBtn.click();
      await this.enterLoop();
      await this.goback();
    }
  }

  async checkPopUp() {
    if (await this.popupCloseBtn.isVisible()) {
      await this.popupCloseBtn.hover();
      await this.popupCloseBtn.click();
    }
  }

  async submitOtherPrizes() {
    const count = await this.nextPrizesCount();
    for (let i = 0; i < count; i++) {
      await this.checkPopUp();
      await this.viewprizeBtn.nth(i).waitFor();
      await this.viewprizeBtn.nth(i).hover();
      await this.viewprizeBtn.nth(i).click();
      await this.enterLoop();
      await this.goback();
    }
    await this.checkPopUp();
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

  async nextPrizesLinkedCount() {
    await this.viewprizelinkedBtn.nth(1).waitFor();
    return (await this.viewprizelinkedBtn.all()).length;
  }

  async thisweekBtnText() {
    return (await this.thisweekBtn.textContent());
  }

  async isGrandPrizeComplete() {
    await this.viewgrandprizeBtn.hover();
    await this.viewgrandprizeBtn.click();
    await this.entriesremainingTitle.waitFor();
    return (parseInt((await this.entriesremainingTitle.innerText()).trim().split(" ")[0]) == 0);
  }
}
