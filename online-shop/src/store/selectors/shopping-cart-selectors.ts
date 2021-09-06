import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ShoppingCartState } from '../state/shopping-cart.state';

const selectShoppingCartState = (state: AppState) => state.shoppingCart;

export const selectShoppingCart = createSelector(
  selectShoppingCartState,
  (state: ShoppingCartState) => state.shoppingCart
);

export const selectError = createSelector(
  selectShoppingCartState,
  (state: ShoppingCartState) => state.error
);
