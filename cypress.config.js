const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    testIsolation: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
