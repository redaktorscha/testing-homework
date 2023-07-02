import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Product, CartItem, CartState } from "../../src/common/types";
import { LOCAL_STORAGE_CART_KEY } from "../../src/client/api";

import React from "react";
import { BrowserRouter, MemoryRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

import { Cart } from "../../src/client/pages/Cart";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

const basename = "";

const fakeProduct: Product = {
  id: 1,
  name: "Awful Soap",
  price: 200,
  description: "Never been more disgusting",
  color: "random",
  material: "unique",
};

const localStorageMock = (function () {
  const storage: Record<string, CartState> = {
    [LOCAL_STORAGE_CART_KEY]: {},
  };

  return {
    getItem(key: string) {
      return storage[key];
    },
    setItem: function (key: string, value: CartState) {
      storage[key] = value;
    },
  };
})();

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
});

describe("Покупка товара через корзину", () => {
  it("показывает форму, если корзина не пустая", async () => {
    const api = new ExampleApi(basename);

    const cart = new CartApi();

    const store = initStore(api, cart);

    store.dispatch({
      type: "ADD_TO_CART",
      product: fakeProduct,
    });

    const TestApp = () => {
      return (
        <MemoryRouter initialEntries={["/cart"]}>
          <Provider store={store}>
            <Route path="/cart" component={Cart}></Route>
          </Provider>
        </MemoryRouter>
      );
    };
    render(<TestApp />);
    await screen.findByText(fakeProduct.name).then(() => {
      const form = screen.getByText(/checkout/i);
      expect(form).toBeInTheDocument();
    });
  });

  it("поля формы можно заполнить", async () => {
    const api = new ExampleApi(basename);

    const cart = new CartApi();

    const store = initStore(api, cart);

    store.dispatch({
      type: "ADD_TO_CART",
      product: fakeProduct,
    });

    const TestApp = () => {
      return (
        <MemoryRouter initialEntries={["/cart"]}>
          <Provider store={store}>
            <Route path="/cart" component={Cart}></Route>
          </Provider>
        </MemoryRouter>
      );
    };
    const { container } = render(<TestApp />);
    const user = userEvent.setup();
    await screen.findByText(fakeProduct.name).then(async () => {
      const controlName = container.querySelector("#f-name");
      const controlPhone = container.querySelector("#f-phone");
      const controlAddress = container.querySelector("#f-address");
      const submitBtn = container.querySelector(".Form-Submit");
      await user.type(controlName, "User Name");
      await user.type(controlPhone, "123-123-1234");
      await user.type(controlAddress, "My fake address");
      await user.click(submitBtn);

      await waitFor(() => {
        expect(controlName.classList).not.toContain("is-invalid");
        expect(controlPhone.classList).not.toContain("is-invalid");
        expect(controlAddress.classList).not.toContain("is-invalid");
      });
    });
  });

  it("форма сабмитится", async () => {
    const api = new ExampleApi(basename);
    api.checkout = () => {
      return new Promise((resolve) =>
        resolve({
          data: { id: 1 },
          status: 200,
          statusText: "OK",
          headers: { "": "" },
          config: {},
        })
      );
    };

    const cart = new CartApi();

    const store = initStore(api, cart);

    store.dispatch({
      type: "ADD_TO_CART",
      product: fakeProduct,
    });

    const TestApp = () => {
      return (
        <MemoryRouter initialEntries={["/cart"]}>
          <Provider store={store}>
            <Route path="/cart" component={Cart}></Route>
          </Provider>
        </MemoryRouter>
      );
    };
    const { container } = render(<TestApp />);

    await screen.findByText(fakeProduct.name).then(async () => {
      store.dispatch({
        type: "CHECKOUT_COMPLETE",
        orderId: 1,
      });

      await waitFor(() => {
        expect(screen.getByText("Well done!")).toBeInTheDocument();
        const alertElem = container.querySelector('.Cart-SuccessMessage');
        expect(alertElem.classList).toContain('alert-success');
      });
    });
  });
});
