require("dotenv").config();
const puppeteer = require('puppeteer');
const url = 'http://localhost:8080/';

//Logs in with fake account. Necessary for anything that requires the user to be logged in
async function Login(page) {
    return new Promise(async (resolve, reject) => {
        try {
            await page.goto(
                `https://${process.env.AUTH_DOMAIN}/authorize?client_id=${process.env.AUTH_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REDIRECT_URI}`,
                { waitUntil: "networkidle2" }
            );
            await page.waitForSelector('input[name="email"]', {
                visible: true,
                timeout: 5000
            });
            await page.type('input[name="email"]', 'fake@fake.fake', { delay: 50 });
            await page.type('input[name="password"]', 'Fake1Fake1', { delay: 50 });
            await page.click('button[type="submit"]');
            await page.waitForNavigation({ waitUntil: "networkidle2" });
            resolve()
        } catch (error) {
            console.error(error)
            reject()
        }
    })
}

//takes screenshot of homepage
async function homePage() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url);
    await page.screenshot({ path: 'Test/faq.png', fullPage: true });
    browser.close();
}

//takes screenshot of FAQ page
async function faqPage() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url)
    await page.setViewport({ width: 1280, height: 800 })
    await page.waitForSelector('#nav-faq-link')
    const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('#nav-faq-link')
    ]);
    await page.screenshot({ path: 'Test/homepage.png', fullPage: true });
    browser.close();
}

//takes screenshot of profile page
async function profilePage() {
    const browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await Login(page)
    await page.close()

    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url)
    await page.waitForSelector('#nav-profile-link')
    const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('#nav-profile-link')
    ]);
    await page.screenshot({ path: 'Test/profile.png', fullPage: true })
    browser.close();
}



async function run() {
    await homePage()
    await faqPage()
    await profilePage()
}

run();