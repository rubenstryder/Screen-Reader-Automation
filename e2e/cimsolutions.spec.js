// @ts-check
import { nvdaTest as test } from "@guidepup/playwright";
import { expect } from '@playwright/test';

test.describe("Playwright with nvda on the CIMSOLUTIONS pages.", () => {
    let spoken = "";
    
    test('Testing the navigation skip link', async ({ page, nvda }) => {
        await page.goto("https://www.cimsolutions.nl/");

        // auto-accept cookie via scripting
        await page.getByRole('button', { name: 'Allow all' }).click();

        await nvda.interact();
        await nvda.next();
        
        const spoken = await nvda.lastSpokenPhrase();

        await nvda.navigateToWebContent();

        expect(spoken).toContain("link, Naar de navigatie");
    });

    test('Testing the entire journey to find a job.', async ({ page, nvda }) => {
        await page.goto("https://www.cimsolutions.nl/");

        // auto-accept cookie via scripting
        await page.getByRole('button', { name: 'Allow all' }).click();

        // Navigate towards the "werken bij ons" menu
        await nvda.press("Tab");
        await nvda.press("Enter");
        
        for (let i = 0; i < 15; i++) {
            await nvda.press("Tab");
        }

        // Navigate towards the vacature page
        spoken = await nvda.lastSpokenPhrase();
        expect(spoken).toContain("lijst, met 6 items, Vacatures, link");
        await nvda.press("Enter");
        
        // Go to the filter and try to find an architect job with this methode
        await nvda.press("Enter");
        
        for (let i = 0; i < 4; i++) {
            await nvda.press("Tab");
        }
        spoken = await nvda.lastSpokenPhrase();
        expect(spoken).toContain("Functie, knop, samengevouwen");
        await nvda.press("Enter");

        // Select architect
        for (let i = 0; i < 3; i++) {
            await nvda.press("Tab");
        }

        spoken = await nvda.lastSpokenPhrase();
        expect(spoken).toContain("Architect(2), selectievakje, uitgeschakeld");
        await nvda.press("Enter");

        // Go to the job page
        for (let i = 0; i < 19; i++) {
            await nvda.press("Tab");
        }
        spoken = await nvda.lastSpokenPhrase();
        expect(spoken).toContain("Bekijk vacature voor IT Architect, link");
        
        await nvda.press("Enter");
        await nvda.press("Enter");
        await nvda.next();
        await nvda.navigateToWebContent();
    });

    test('Testing the entire journey to find a AI product and making contact with CIMSOLUTIONS.', async ({ page, nvda }) => {
        await page.goto("https://www.cimsolutions.nl/");

        // auto-accept cookie via scripting
        await page.getByRole('button', { name: 'Allow all' }).click();

        // Navigate towards the "AI" menu
        await nvda.press("Tab");
        await nvda.press("Enter");
        
        for (let i = 0; i < 3; i++) {
            await nvda.press("Tab");
        }
        spoken = await nvda.lastSpokenPhrase();
        expect(spoken).toContain("Virtual Assistant AI, link");

        // Move towards the contact form
        await nvda.press("Enter");
        await nvda.press("Enter");
        await nvda.press("Tab");
        await nvda.press("Tab");

        // Fill the contact form
        // Name
        spoken = await nvda.lastSpokenPhrase();
        expect(spoken).toContain("Naam ster, invoerveld, vereist, heeft auto aanvullen, Voor en achternaam, leeg");
        await nvda.type("Ruben Strydom");
        await nvda.press("Tab");
        await nvda.press("Tab");

        // Email
        spoken = await nvda.lastSpokenPhrase();
        expect(spoken).toContain("E mail ster, invoerveld, vereist, heeft auto aanvullen, E mailadres, leeg");
        await nvda.type("ruben.strydom@student.hu.nl");
        await nvda.press("Tab");

        // Phone number
        spoken = await nvda.lastSpokenPhrase();
        expect(spoken).toContain("Telefoon, invoerveld, heeft auto aanvullen, Telefoonnummer, leeg");
        await nvda.type("0611111112");
        for (let i = 0; i < 7; i++) {
            await nvda.press("Tab");
        }
        
        spoken = await nvda.lastSpokenPhrase();
        await nvda.navigateToWebContent();
        expect(spoken).toContain("Verstuur, knop");
    });
});