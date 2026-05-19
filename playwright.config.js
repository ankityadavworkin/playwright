// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config =({
  testDir: './tests',
  timeout: 20 * 1000, // Applicable for every step
  
  expect: {
    timeout: 20 * 1000,  // Applicable for expect() assertions
  },

  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,
   
  },

});

module.exports=config

