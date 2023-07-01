import { screen, render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import React from "react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

const basename = "";

const api = new ExampleApi(basename);
const cart = new CartApi();
const store = initStore(api, cart);

describe("App pages", () => {
  it("has home page and displays its title and heading correctly", () => {
    const TestApp = (
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    const { container } = render(TestApp, { wrapper: BrowserRouter });

    const banner = container.querySelector(".display-3");
    expect(banner.textContent).toEqual("Welcome to Example store!");
  });

  it("has catalog page and displays its title and heading correctly", () => {
    const TestApp = (
      <MemoryRouter initialEntries={["/catalog"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(TestApp, { wrapper: BrowserRouter });

    // expect(screen.getByTestId("page-title").textContent).toEqual(
    //   "Catalog — Example store"
    // );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toEqual(
      "Catalog"
    );
  });

  it("has delivery page and displays its title and heading correctly", () => {
    const TestApp = (
      <MemoryRouter initialEntries={["/delivery"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(TestApp, { wrapper: BrowserRouter });

    // expect(screen.getByTestId("page-title").textContent).toEqual(
    //   "Catalog — Example store"
    // );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toEqual(
      "Delivery"
    );
  });

  it("has contacts page and displays its title and heading correctly", () => {
    const TestApp = (
      <MemoryRouter initialEntries={["/contacts"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(TestApp, { wrapper: BrowserRouter });

    // expect(screen.getByTestId("page-title").textContent).toEqual(
    //   "Catalog — Example store"
    // );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toEqual(
      "Contacts"
    );
  });

  it("has shopping cart page and displays its title and heading correctly", () => {
    const TestApp = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(TestApp, { wrapper: BrowserRouter });

    // expect(screen.getByTestId("page-title").textContent).toEqual(
    //   "Catalog — Example store"
    // );
    expect(screen.getByRole("heading", { level: 1 }).textContent).toEqual(
      "Shopping cart"
    );
  });
});

describe("navigates correctly", () => {
  it("navigates from root to Catalog", () => {
    const TestApp = (
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(TestApp, { wrapper: BrowserRouter });

    const link = screen.getByRole("link", {
      name: /catalog/i,
    });

    fireEvent.click(link);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading.textContent).toEqual("Catalog");
  });

  it("navigates from root to Delivery", () => {
    const TestApp = (
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(TestApp, { wrapper: BrowserRouter });

    const link = screen.getByRole("link", {
      name: /delivery/i,
    });

    fireEvent.click(link);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading.textContent).toEqual("Delivery");
  });
});
