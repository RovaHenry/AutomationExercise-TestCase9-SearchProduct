const {Builder, By} = require('selenium-webdriver');
const DashboardPage = require ('./WebComponent/DashboardPage');
const SearchPage = require ('./WebComponent/SearchPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseURL = process.env.BASE_URL;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('TestCase 9 [Search Page]', function(){
    this.timeout(50000);
    let driver;

    switch (browser) {
        case 'chrome' :
        default :
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
        break;
    }
    
    //Run setiap mulai test, satu kali saja paling awal
    before(async function () {
        //Run tanpa membuka chorome dengan menggunakan --headless
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    it('Verify HomePage', async function () {
        const dashboardPage = new DashboardPage(driver);
        await dashboardPage.navigate(baseURL);
        const isLogoDisplayed = await dashboardPage.verifyLogoHome();
        if (isLogoDisplayed) {
            console.log("Homepage is visible successfully.");
        } else {
            console.log("Homepage is not visible.");
        }  
    });
    it('Verify Products Page', async function () {
        const searchPage = new SearchPage(driver);
        await searchPage.productButton();
        // Verify user is navigated to ALL PRODUCTS page successfully
        const currentUrl = await driver.getCurrentUrl();
        assert.strictEqual(currentUrl, `${baseURL}/products`, 'URL does not match');
        // The product searched is visible
        await searchPage.productSearch();
        await searchPage.SearchBtn();
        const productName = await searchPage.verifyProductName();
        assert.strictEqual(productName, "Men Tshirt", "Product name does not match");
        console.log("Product name is visible successfully.");
    });

    //Assertion atau validasi
    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
        console.log('Screenshot succesfully saved');
    });
    
    after(async function () {
        await driver.quit()
    });
});