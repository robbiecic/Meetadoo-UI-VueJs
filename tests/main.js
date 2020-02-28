module.exports = {
  "Demo loading website": function(browser) {
    browser
      .url("https://www.meetadoo.com/")
      .waitForElementVisible("body")
      .assert.titleContains("my-app")
      //   .assert.visible("input[type=search]")
      //   .setValue("input[type=search]", "nightwatch")
      //   .assert.visible("button[type=submit]")
      //   .click("button[type=submit]")
      //   .assert.containsText(".mainline-results", "Nightwatch.js")
      .end();
  }
};
