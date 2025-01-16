const {By} = require('selenium-webdriver');

class SearchPage {
    constructor(driver) {
        this.driver = driver;
        this.productBtn = By.css("[href='/products']");
        this.productName = By.css(".productinfo > p");
        this.SearchProduct = By.css("#search_product");
        this.SearchProductBtn = By.css("#submit_search");
    }
    async productButton() {
        await this.driver.findElement(this.productBtn).click();
    }
    async productSearch() {
        await this.driver.findElement(this.SearchProduct).sendKeys("Men Tshirt");
    }
    async verifyProductName() {
        const nameProduct = await this.driver.findElement(this.productName).getText();
        return nameProduct;
    }

    async SearchBtn() {
        await this.driver.findElement(this.SearchProductBtn).click();
    }

}

module.exports = SearchPage;