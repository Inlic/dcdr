require("dotenv").config();
const puppeteer = require('puppeteer');
const url = 'http://localhost:8080/';

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


async function homePage() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url);
    await page.screenshot({ path: 'homepage.png', fullPage: true });
    browser.close();
}

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
    await profilePage()
}

run();