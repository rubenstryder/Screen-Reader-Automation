// @ts-check
import { nvdaTest as test } from "@guidepup/playwright";
import { expect } from '@playwright/test';

test.describe("Playwright with nvda", () => {
    test('Testing the CIMSOLUTIONS navigation skip link', async ({ page, nvda }) => {
        await page.goto("https://www.cimsolutions.nl/");

        await nvda.interact();
        await nvda.next();
        
        const spoken = await nvda.lastSpokenPhrase();

        await nvda.navigateToWebContent();

        expect(spoken).toContain("link, Naar de navigatie");
    });
});