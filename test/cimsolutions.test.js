const { nvda } = require("../node_modules/@guidepup/guidepup");
const { chromium } = require("playwright");

describe("Accessibility tests (NVDA)", () => {
  let browser;
  let context;
  let page;
  let screenReader;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();

    screenReader = nvda;
    await screenReader.start();
  });

  test("NVDA leest de hyperlink", async () => {
    await page.goto("https://www.cimsolutions.nl/");

    await screenReader.interact();
    await screenReader.next();

    const spoken = await screenReader.lastSpokenPhrase();
    //expect(spoken).toMatch(/Example Domain/i);
    //expect(spoken).toMatch(/heading/i);
    console.log(spoken);
  });

  test("NVDA leest iets", async () => {
    await page.goto("https://www.cimsolutions.nl/");

    await screenReader.interact();
    await screenReader.next();
    await screenReader.next();

    const spoken = await screenReader.lastSpokenPhrase();
    //expect(spoken).toMatch(/Example Domain/i);
    //expect(spoken).toMatch(/heading/i);
    console.log(spoken);
  });

  afterAll(async () => {
    await screenReader.stop();
    //await browser.close();
  });

});
