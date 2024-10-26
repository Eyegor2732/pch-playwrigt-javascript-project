"use strict";

const { BaseTest } = require("./BaseTest");

class PurchasePage extends BaseTest{
    
    constructor(page) {
        super(page);
        this.page = page;
        this.viewprizeBtn = page.locator('//div[contains(@class,"view_prize-btn")]');
        this.viewgrandprizeBtn = page.locator('//div[@class="view_prize-btn "]');
        this.viewprizelinkedBtn = page.locator('div[class="view_prize-btn with-link"]');
        this.toastcloseBtn = page.locator('.toast-close');
        this.entriesremainingTitle = page.locator('span[class="num-remaining"]');
        this.entertowinBtn = page.getByRole('button').filter({hasText: 'Enter To Win'});
        this.thisweekBtn = page.locator('.button-link');
        this.grandprizedisabledBtn = page.locator('.button-link.disabled-cta');
    }
    
    async submitThisweekPrize() {
        await this.thisweekBtn.click();
        await this.enterLoop();
        await this.goback();
    }

    async submitOtherPrizes() {
      const count = await this.nextPrizesCount();
      for (let i = 0; i < count; i++) {
        await this.viewprizeBtn.nth(i).click();
        await this.enterLoop();
        if (i < count) await this.goback();
      }
    }

    async enterLoop() {
      await this.entriesremainingTitle.waitFor();
        while (parseInt((await this.entriesremainingTitle.innerHTML()).trim().split(" ")[0]) != 1) {
          await this.entertowinBtn.click();
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
    return (parseInt((await this.entriesremainingTitle.innerHTML()).trim().split(" ")[0]) == 0);
  }
}

module.exports = {PurchasePage};