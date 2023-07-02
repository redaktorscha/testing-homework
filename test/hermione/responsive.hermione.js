const expect = require("chai").expect;

describe("адаптив главной страницы", async function () {
  it("корректно рендерится, xs ширина", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store");
    await browser.setWindowSize(375, 1080);
    await browser.assertView("xs-width", "body", {
      screenshotDelay: 10,
    });
  });

  it("корректно рендерится, small ширина", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store");
    await browser.setWindowSize(576, 1080);
    await browser.assertView("sm-width", "body", {
      screenshotDelay: 10,
    });
  });

  it("корректно рендерится, medium ширина", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store");
    await browser.setWindowSize(992, 1080);
    await browser.assertView("md-width", "body", {
      screenshotDelay: 10,
    });
  });

  it("корректно рендерится, large ширина", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store");
    await browser.setWindowSize(1024, 1080);
    await browser.assertView("large-width", "body", {
      screenshotDelay: 10,
    });
  });

  it("корректно рендерится, xl ширина", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store");
    await browser.setWindowSize(1200, 1080);
    await browser.assertView("xl-width", "body", {
      screenshotDelay: 10,
    });
  });

  it("корректно рендерится, xxl ширина", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store");
    await browser.setWindowSize(1400, 1080);
    await browser.assertView("xxl-width", "body", {
      screenshotDelay: 10,
    });
  });

  it("показывает гамбургер (скриншот), если ширина < 576px", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store");
    await browser.setWindowSize(575, 1080);
    await browser.assertView("burger-menu", "body", {
      screenshotDelay: 10,
    });
  });

  it("не показывает гамбургер (скриншот), если ширина > 576px", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store");
    await browser.setWindowSize(576, 1080);
    await browser.assertView("no-burger", "body", {
      screenshotDelay: 10,
    });
  });

  it("показывает гамбургер (поиск селектора), если ширина < 576px", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store");
    await browser.setWindowSize(575, 1080);

    const burgerButton = await browser.$(".Application-Toggler");
    const isDisplayed = await burgerButton.isDisplayed();
    expect(isDisplayed).to.be.true;
  });

  it("не показывает гамбургер (поиск селектора), если ширина > 575px", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store");
    await browser.setWindowSize(576, 1080);

    const burgerButton = await browser.$(".Application-Toggler");
    const isDisplayed = await burgerButton.isDisplayed();
    expect(isDisplayed).not.to.be.true;
  });
});
