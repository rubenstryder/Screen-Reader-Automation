const { nvda } = require("@guidepup/guidepup");
const { chromium } = require("playwright");

let browser;
let context;
let page;

(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

    await nvda.start();
    await page.goto("https://www.cimsolutions.nl/");

    await nvda.interact();
    await nvda.next();

    const spoken = await nvda.lastSpokenPhrase();
    //expect(spoken).toMatch("link, Naar de navigatie");
    if (spoken.match("link, Naar de navigatie")) {
        console.log("Test succeeded");
    } else {
        console.log("Test failed");
    }

    await nvda.stop();
    await browser.close();
})();