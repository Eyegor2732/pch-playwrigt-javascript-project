"use strict";

export class BaseTest {

    constructor(page) {
        this.page = page;
    }

    async goto(url) {
        await this.page.goto(url);
        await this.page.waitForTimeout(1000);
    }

    async goback() {
        await this.page.goBack();
    }

}
