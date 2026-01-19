// @ts-check
const { screenReaderConfig } = require("@guidepup/playwright");
import { devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: './e2e',
  ...screenReaderConfig,
  reportSlowTests: null,
  timeout: 3 * 60 * 1000,
  retries: 2,
  projects: [
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: false },
    },
  ],
};

module.exports = config;