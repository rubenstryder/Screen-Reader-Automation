// @ts-check
import { nvdaTest as test } from "@guidepup/playwright";
import { expect } from '@playwright/test';

test.describe("Playwright with nvda", () => {
    test('Testing the CIMSOLUTIONS skip link', async ({ page, nvda }) => {
        await page.goto("https://www.cimsolutions.nl/", {
            waitUntil: "load",
        });
        
        const spoken = await nvda.spokenPhraseLog();

        await nvda.navigateToWebContent();

        //console.log("last spoken phrase: " + spoken);
        expect(spoken).toContain("Naar de navigatie link");
    });
});