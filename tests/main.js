module.exports = {
  "Loading website works": function(browser) {
    browser
      .url("https://www.meetadoo.com/")
      .waitForElementVisible("body")
      .assert.titleContains("my-app")
      //Go to login screen
      .click("a[data-test=button_login]")
      .setValue("input[data-test=text_email]", "test5@test.com")
      .setValue("input[data-test=text_password]", "password")
      .click("a[data-test=button_submit_login]")
      //   .setValue("input[type=search]", "nightwatch")
      //   .assert.visible("button[type=submit]")
      //   .click("button[type=submit]")
      //   .assert.containsText(".mainline-results", "Nightwatch.js")
      .end();
  }
};
