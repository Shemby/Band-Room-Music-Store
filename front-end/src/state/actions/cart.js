import {
  ADDED_TO_CART,
  REMOVED_FROM_CART,
  INCREMENT_CART_ITEM,
  DECREMENT_CART_ITEM,
  PURCHASE_MADE,
} from './types';
import Axios from 'axios';

export const addToCart = (item) => {
  return function (dispatch, getState) {
    const state = getState();
    const cartItems = state.cartReducer.cartItems;
    if (cartItems.length === 0) {
      item.inCart = true;
      dispatch({ type: ADDED_TO_CART, payload: item });
    } else {
      const cartItem = cartItems.includes(
        (cartItem) => cartItem._id === item._id
      );
      if (cartItem === false && item.inCart === false) {
        item.inCart = true;
        dispatch({ type: ADDED_TO_CART, payload: item });
      } else if (cartItem === true && item.inCart === true) {
        dispatch({ type: INCREMENT_CART_ITEM, payload: item });
      }
    }
  };
};

export const removeFromCart = (id) => {
  return function (dispatch, getState) {
    let state = getState();
    const items = state.cartReducer.cartItems.filter((item) => item._id !== id);
    dispatch({ type: REMOVED_FROM_CART, payload: items });
    state = getState();
  };
};

export const increment = (item) => {
  return { type: INCREMENT_CART_ITEM, payload: item };
};

export const decrement = (item) => {
  return { type: DECREMENT_CART_ITEM, payload: item };
};

export const purchase = (token) => {
  return async function (dispatch, getState) {
    const state = getState();
    const cart = state.cartReducer.cartItems;
    const options = {
      headers: {
        'Content-type': 'application/json',
      },
      data: {
        item: cart,
        token,
      },
      method: 'POST',
      url: 'http://localhost:3000/payment',
    };
    console.log(options);
    await Axios(options);
    dispatch({ type: PURCHASE_MADE });
  };
};
