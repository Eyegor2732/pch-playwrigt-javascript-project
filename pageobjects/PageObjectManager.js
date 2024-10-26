"use strict";

const {LoginPage} = require('./LoginPage');
const {PurchasePage} = require('./PurchasePage');

class PageObjectsManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page, this.url);
        this.purchasePage = new PurchasePage(this.page, this.url);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getPurchasePage() {
        return this.purchasePage;
    }

}

module.exports = {PageObjectsManager};
