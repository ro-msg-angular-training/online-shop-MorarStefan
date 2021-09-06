import ShoppingCartItem from 'src/interfaces/ShoppingCartItem';

export interface ShoppingCartState {
  shoppingCart: Array<ShoppingCartItem>;
  error: string | null;
}

export const initialShoppingCartState: ShoppingCartState = {
  shoppingCart: [],
  error: null,
};
