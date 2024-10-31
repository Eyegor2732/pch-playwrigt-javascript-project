"use strict";

class BaseTest {

    constructor(page) {
        this.page = page;
    }

    async goto(url) {
        await this.page.goto(url);
    }

    async goback() {
        await this.page.goBack();
    }
     
}

module.exports = {BaseTest};