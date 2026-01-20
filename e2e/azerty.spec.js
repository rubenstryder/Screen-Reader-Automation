// @ts-check
import { nvdaTest as test } from "@guidepup/playwright";
import { expect } from '@playwright/test';

test.describe("Playwright with nvda on the azerty pages.", () => {
    let spoken = "";
    
    test('Testing the journey to find and buy a product.', async ({ page, nvda }) => {
        await page.goto("https://www.azerty.nl/");

        // auto-accept cookie via scripting
        await page.getByRole('button', { name: 'Alleen noodzakelijke cookies' }).click();

        // Go to the search bar and see if the virtual user can find the product
        await nvda.press("Tab");
        await nvda.press("Tab");
        await nvda.type("Gaming Laptop");
        await nvda.press("Enter");

        // Go to the content layer
        await nvda.press("Enter");

        // Go to the product layer
        await nvda.press("Tab");
        await nvda.press("Enter");

        // Select and add the product
        for (let i = 0; i < 7; i++) {
            await nvda.press("Tab");
        }
        spoken = await nvda.lastSpokenPhrase();
        expect(spoken).toContain("In winkelwagen MSI Cyborg 15 A 13VE 693NL Laptop, knop");
        await nvda.press("Enter");

        // Go to the shopping cart
        await nvda.press("Tab");
        await nvda.press("Tab");
        
        spoken = await nvda.lastSpokenPhrase();
        expect(spoken).toContain("Bekijk winkelwagen, link");
        await nvda.press("Enter");

        // Buy the product
        await nvda.press("Enter");
        for (let i = 0; i < 11; i++) {
            await nvda.press("Tab");
        }

        spoken = await nvda.lastSpokenPhrase();
        expect(spoken).toContain("Ga naar afrekenen, navigatie oriëntatiepunt, lijst, met 1 items, Ga door naar afrekenen, link");
        await nvda.press("Enter");
        await nvda.navigateToWebContent();
    });
});