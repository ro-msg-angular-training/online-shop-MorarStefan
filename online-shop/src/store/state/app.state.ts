import { initialProductState, ProductState } from './product.state';
import {
  initialShoppingCartState,
  ShoppingCartState,
} from './shopping-cart.state';
import { initialUserState, UserState } from './user.state';

export interface AppState {
  user: UserState;
  product: ProductState;
  shoppingCart: ShoppingCartState;
}

export const initialAppState: AppState = {
  user: initialUserState,
  product: initialProductState,
  shoppingCart: initialShoppingCartState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
