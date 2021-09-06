import {
  EShoppingCartActions,
  ShoppingCartActions,
} from '../actions/shopping-cart.actions';
import {
  initialShoppingCartState,
  ShoppingCartState,
} from '../state/shopping-cart.state';

export const shoppingCartReducers = (
  state = initialShoppingCartState,
  action: ShoppingCartActions
): ShoppingCartState => {
  switch (action.type) {
    case EShoppingCartActions.CreateOrderSuccess: {
      return {
        ...state,
        shoppingCart: [],
      };
    }
    case EShoppingCartActions.CreateOrderError: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case EShoppingCartActions.AddItemSuccess: {
      let isNewItem = true;
      const newShoppingCart = state.shoppingCart.map((iterator) => {
        if (iterator.productId === action.payload.productId) {
          isNewItem = false;
          iterator = {
            ...iterator,
            quantity: iterator.quantity + action.payload.quantity,
          };
        }
        return iterator;
      });
      return {
        ...state,
        shoppingCart: isNewItem
          ? [...state.shoppingCart, action.payload]
          : newShoppingCart,
      };
    }
    default:
      return state;
  }
};
