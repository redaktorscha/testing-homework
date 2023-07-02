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

describe("Роутинг", () => {
  it("есть главная, отображается корректно", () => {
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

  it("есть страница каталога", () => {
    const TestApp = (
      <MemoryRouter initialEntries={["/catalog"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(TestApp, { wrapper: BrowserRouter });

    expect(screen.getByRole("heading", { level: 1 }).textContent).toEqual(
      "Catalog"
    );
  });

  it("есть страница доставки", () => {
    const TestApp = (
      <MemoryRouter initialEntries={["/delivery"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(TestApp, { wrapper: BrowserRouter });

    expect(screen.getByRole("heading", { level: 1 }).textContent).toEqual(
      "Delivery"
    );
  });

  it("есть страница контактов", () => {
    const TestApp = (
      <MemoryRouter initialEntries={["/contacts"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(TestApp, { wrapper: BrowserRouter });


    expect(screen.getByRole("heading", { level: 1 }).textContent).toEqual(
      "Contacts"
    );
  });

  it("есть корзина", () => {
    const TestApp = (
      <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
        <Provider store={store}>
          <Application />
        </Provider>
      </MemoryRouter>
    );

    render(TestApp, { wrapper: BrowserRouter });


    expect(screen.getByRole("heading", { level: 1 }).textContent).toEqual(
      "Shopping cart"
    );
  });
});

describe("Навигация", () => {
  it("ходит в каталог", () => {
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

  it("ходит в доставку", () => {
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
