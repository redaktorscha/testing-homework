const expect = require("chai").expect;

describe("каталог", async function () {
  it("для каждого товара в каталоге отображается название", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");
    await browser.setWindowSize(992, 1080);
    const allProductsNames = await browser
      .$$(".ProductItem-Name")
      .map(async (p) => await p.getText())
      .join("");

    expect(allProductsNames).not.to.equal("");
  });

  it("для каждого товара в каталоге отображается цена", async ({ browser }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");
    await browser.setWindowSize(992, 1080);
    const allProductsPrices = await browser
      .$$(".ProductItem-Price")
      .map(async (p) => await p.getText())
      .join("");

    expect(allProductsPrices).not.to.equal("");
  });

  it("для каждого товара в каталоге отображается линк на детали", async ({
    browser,
  }) => {
    await browser.url("http://localhost:3000/hw/store/catalog");
    await browser.setWindowSize(992, 1080);
    let hasDetails = true;

    for await (const p of browser.$$(".ProductItem-Price")) {
      const linkEl = await p.nextElement();
      const link = await linkEl.getAttribute("href");
      if (!link) {
        hasDetails = false;
      }
    }

    expect(hasDetails).to.be.true;
  });
});
