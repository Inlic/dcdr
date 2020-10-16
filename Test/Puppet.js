require("dotenv").config();
const puppeteer = require('puppeteer');
const url = 'http://localhost:8080/';
let testPollCode = null

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
            await page.type('input[name="email"]', 'fake@fake.fake');
            await page.type('input[name="password"]', 'Fake1Fake1');
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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url);
    await page.screenshot({ path: 'Test/Screenshots/homepage.png', fullPage: true });
    browser.close();
}

//takes screenshot of FAQ page
async function faqPage() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url)
    await page.setViewport({ width: 1280, height: 800 })
    await page.waitForSelector('#nav-faq-link')
    const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('#nav-faq-link')
    ]);
    await page.screenshot({ path: 'Test/Screenshots/faq.png', fullPage: true });
    browser.close();
}

//takes screenshot of profile page
async function profilePage() {
    const browser = await puppeteer.launch();
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
    await page.screenshot({ path: 'Test/Screenshots/profile.png', fullPage: true })
    browser.close();
}

//takes screenshot of create a poll page
async function createPollPage() {
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await Login(page)
    await page.close()

    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url)
    await page.waitForSelector('#nav-create-poll-link')
    const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('#nav-create-poll-link')
    ]);
    await page.screenshot({ path: 'Test/Screenshots/createPollPage.png', fullPage: true })
    browser.close();
}

//creates a test poll and stores poll code
async function createTestPoll() {
    const browser = await puppeteer.launch({ headless: false });
    let page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await Login(page)
    await page.close()

    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(url)
    await page.waitForSelector('#nav-create-poll-link')
    const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('#nav-create-poll-link')
    ]);
    await page.type('#room-name-input', 'Testing Room');
    await page.click('#vetos')
    await page.select('select#vetos', '1')
    await page.click('#blankCheckbox')
    const [response2] = await Promise.all([
        page.waitForNavigation({ waitUntil: 'networkidle0' }),
        page.click('#create-poll-btn')
    ]);
    //retrieves test poll join code for future tests
    testPollCode = await page.evaluate(() => {
        let item = document.querySelector('#room-code')
        //VScode cannot guarantee that item has an innerText, so the ignore is required to prevent incorrect error messages
        //@ts-ignore
        let rawText = item.innerText
        rawText = rawText.split(" ")
        let code = rawText[2]
        return code
    })
    await page.screenshot({ path: 'Test/Screenshots/createTestPoll.png', fullPage: true })
    browser.close();
}



async function run() {
    //screenshots navbar link pages
    console.log("Checking Home Page");
    await homePage()

    console.log("Checking FAQ Page");
    await faqPage()

    console.log("Checking Profile Page");
    await profilePage()

    console.log("Checking Create a Poll Page");
    await createPollPage()

    console.log('\nNavbar links screenshots saved to /dcdr/Test/Screenshots\n');

    //creates a poll
    console.log("Creating Test Poll");
    await createTestPoll()

    console.log('\nPuppeteer functions Completed');
}

run();