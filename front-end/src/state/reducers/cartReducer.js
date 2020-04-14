import { ADDED_TO_CART, REMOVED_FROM_CART } from '../actions/types';

export const initialState = {
  cartItems: [],
  cartTotal: 0,
  cartCost: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDED_TO_CART:
      console.log(action.payload);
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        cartTotal: state.cartTotal + 1,
        cartCost: state.cartCost + action.payload.buy,
      };
    case REMOVED_FROM_CART:
      return {
        ...state,
        cartItems: action.payload,
        cartTotal: state.cartTotal - 1,
        cartCost: state.cartCost - action.payload.buy,
      };
    default:
      return state;
  }
};

export default cartReducer;
