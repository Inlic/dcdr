const puppeteer = require('puppeteer');
const url = 'http://localhost:8080/';

async function Login(page) {

    //not yet implemented

}


async function homePage() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url);
    await page.screenshot({ path: 'homepage.png' });
    browser.close();
}

async function profilePage() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url)
    await Login(page)
    await page.click('a.nav-profile-link')
    await page.waitForSelector('button.rehost-poll-btn')
    await page.screenshot({ path: 'profile.png' });
    browser.close();
}

async function run() {
    //await homePage()
    await profilePage()
}
run();