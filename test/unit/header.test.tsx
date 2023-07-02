import userEvent from "@testing-library/user-event";
import { render, screen, within } from "@testing-library/react";


import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

const basename = "";

const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);
const TestApp = () => (
  <BrowserRouter basename={basename}>
    <Provider store={store}>
      <Application />
    </Provider>
  </BrowserRouter>
);

describe("Header links", () => {
  it("главная", () => {
    const { getByRole } = render(<TestApp />);
    const navbar = getByRole("navigation");
    const mainPageLink = within(navbar).getByRole("link", {
      name: "Example store",
    });
    
    expect(mainPageLink.getAttribute("href")).toBe("/");

 
  });

  it("каталог", () => {
    render(<TestApp />);

    expect(screen.getByRole("link", { name: "Catalog" })).toHaveAttribute(
      "href",
      "/catalog"
    );
  });

  it("доставка", () => {
    render(<TestApp />);

    expect(screen.getByRole("link", { name: "Delivery" })).toHaveAttribute(
      "href",
      "/delivery"
    );
  });

  it("контакты", () => {
    render(<TestApp />);

    expect(screen.getByRole("link", { name: "Contacts" })).toHaveAttribute(
      "href",
      "/contacts"
    );
  });

  it("корзина", () => {
    render(<TestApp />);

    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute(
      "href",
      "/cart"
    );
  });

  it("should open hamburger menu after click", async () => {
    const { container } = render(<TestApp />);

    const user = userEvent.setup();
    const burgerButton = screen.getByRole("button", {
      name: "Toggle navigation",
    });
    const navbar = container.querySelector(".Application-Menu");
    await user.click(burgerButton);
    expect(navbar.classList).not.toContain("collapse");
  });

  it("should close hamburger menu after selection", async () => {
    const { container } = render(<TestApp />);

    const user = userEvent.setup();
    const burgerButton = screen.getByRole("button", {
      name: "Toggle navigation",
    });
    const linkToCatalog = screen.getByRole("link", { name: "Catalog" });
    const navbar = container.querySelector(".Application-Menu");
    await user.click(burgerButton);
    await user.click(linkToCatalog);
    expect(navbar.classList).toContain("collapse");
  });
});
