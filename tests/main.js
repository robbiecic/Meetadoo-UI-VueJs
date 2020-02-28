module.exports = {
  "Loading website works": function(browser) {
    let firstname = "";
    browser
      .url("https://www.meetadoo.com/")
      .waitForElementVisible("body")
      .assert.titleContains("my-app")
      //Go to login screen
      .click("a[data-test=button_login]")
      .setValue("input[data-test=text_email]", "test5@test.com")
      .setValue("input[data-test=text_password]", "password")
      .click("button[data-test=button_submit_login]")
      .assert.containsText("body", "My Profile", "Test passed: Login")
      //Try and update firstname
      .clearValue("css selector", "input[data-test=text_firstname]")
      .setValue("input[data-test=text_firstname]", "Robert")
      .keys(browser.Keys.ENTER)
      .assert.containsText("input[data-test=text_firstname]", "Robert")
      // .getValue(
      //   ("input[data-test=text_firstname]",
      //   function(result) {
      //     firstname = result.value;
      //   })
      // )
      // .assert(firstname, "Robert")
      .end();
  }
};
