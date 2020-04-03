import { ADDED_TO_CART, REMOVED_FROM_CART } from '../actions/types';

const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADDED_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      };
    case REMOVED_FROM_CART:
      return {
        ...state,
        cartItems: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
