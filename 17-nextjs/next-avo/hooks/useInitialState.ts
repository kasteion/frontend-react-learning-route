import { useState } from "react";
import initialState from "../context/initialState";

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addToCart = (payload: { product: TProduct; number: number }) => {
    const found = state.cart.find(
      (item) => item.product.id === payload.product.id
    );
    if (found) {
      const cart = state.cart.map((item) => {
        if (item.product.id === payload.product.id) {
          return { ...item, number: item.number + payload.number };
        } else {
          return item;
        }
      });
      setState({ ...state, cart: cart });
    } else {
      setState({ ...state, cart: [...state.cart, payload] });
    }
  };

  const removeFromCart = (payload: TProduct) => {
    const cart = state.cart
      .map((item) => {
        if (item.product.id === payload.id) {
          return { ...item, number: item.number - 1 };
        } else {
          return item;
        }
      })
      .filter((item) => item.number !== 0);
    setState({
      ...state,
      cart: cart,
    });
  };

  return { addToCart, removeFromCart, state } as TUseInitialState;
};

export default useInitialState;
