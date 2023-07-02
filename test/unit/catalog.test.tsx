import { screen, render, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AxiosResponse } from "axios";
import type { ProductShortInfo } from "../../src/common/types";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Catalog } from "../../src/client/pages/Catalog";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

const basename = "";
type ApiProductsReturnValue = jest.Mocked<AxiosResponse<ProductShortInfo[]>>;

const dummyProducts: ProductShortInfo[] = [
  { id: 0, name: "Awful Soap", price: 100 },
  { id: 1, name: "Ugly Hat", price: 200 },
  { id: 2, name: "Boring Shoes", price: 300 },
  { id: 3, name: "Cheap Chair", price: 400 },
  { id: 4, name: "Yucky Fish", price: 500 },
  { id: 5, name: "Ugly Pants", price: 600 },
];

const itemsNames = dummyProducts.map((p) => p.name);
const itemsPrices = dummyProducts.map((p) => p.price);
const itemsIds = dummyProducts.map((p) => p.id);

const itemsCount = dummyProducts.length;

const api = new ExampleApi(basename);

const mockGetProducts = async (): Promise<ApiProductsReturnValue> => {
  return new Promise((resolve) =>
    resolve({
      data: dummyProducts,
      status: 200,
      statusText: "OK",
      headers: { "": "" },
      config: {},
    })
  );
};

describe("Каталог", () => {
  it("количество товаров с апи корректное", async () => {
    api.getProducts = mockGetProducts;
    const cart = new CartApi();
    const store = initStore(api, cart);

    const TestApp = () => {
      return (
        <BrowserRouter basename={basename}>
          <Provider store={store}>
            <Catalog />
          </Provider>
        </BrowserRouter>
      );
    };
    const { container } = render(<TestApp />);
    await screen.findByText(dummyProducts[0].name).then(() => {
      const products = container.querySelectorAll(".ProductItem");

      expect(products.length).toEqual(itemsCount);
    });
  });

  it("показывает корректные товары с апи", async () => {
    api.getProducts = mockGetProducts;
    const cart = new CartApi();
    const store = initStore(api, cart);

    const TestApp = () => {
      return (
        <BrowserRouter basename={basename}>
          <Provider store={store}>
            <Catalog />
          </Provider>
        </BrowserRouter>
      );
    };
    const { container } = render(<TestApp />);
    await screen.findByText(dummyProducts[0].name).then(() => {
      const productNames = Array.from(
        container.querySelectorAll(".ProductItem-Name")
      ).map((el) => el.textContent);
      expect(productNames.join(",") === itemsNames.join(","));
    });
  });

  it("корректные цены", async () => {
    api.getProducts = mockGetProducts;
    const cart = new CartApi();
    const store = initStore(api, cart);

    const TestApp = () => {
      return (
        <BrowserRouter basename={basename}>
          <Provider store={store}>
            <Catalog />
          </Provider>
        </BrowserRouter>
      );
    };
    const { container } = render(<TestApp />);
    await screen.findByText(dummyProducts[0].name).then(() => {
      const productPrices = Array.from(
        container.querySelectorAll(".ProductItem-Price")
      ).map((p) => p.textContent.slice(1));
      expect(
        productPrices.join(",") ===
          itemsPrices.map((price) => String(price)).join(",")
      ).toBeTruthy();
    });
  });

  it("ссылки на детали", async () => {
    api.getProducts = mockGetProducts;
    const cart = new CartApi();
    const store = initStore(api, cart);

    const TestApp = () => {
      return (
        <BrowserRouter basename={basename}>
          <Provider store={store}>
            <Catalog />
          </Provider>
        </BrowserRouter>
      );
    };
    const { container } = render(<TestApp />);
    await screen.findByText(dummyProducts[0].name).then(() => {
      const productLinks = Array.from(
        container.querySelectorAll(
          ".ProductItem-DetailsLink"
        ) as NodeListOf<HTMLAnchorElement>
      ).map((link) => link.href.slice(-1));
      expect(
        productLinks.join(",") === itemsIds.map((id) => String(id)).join(",")
      ).toBeTruthy();
    });
  });
});
