"use strict";

import { LoginPage } from './LoginPage';
import { PurchasePage } from './PurchasePage';

export class PageObjectsManager {

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

