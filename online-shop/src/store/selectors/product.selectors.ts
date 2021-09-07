import { createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { ProductState } from '../state/product.state';

const selectProductState = (state: AppState) => state.product;

export const selectProductList = createSelector(
  selectProductState,
  (state: ProductState) => state.productList
);

export const selectProduct = createSelector(
  selectProductState,
  (state: ProductState) => state.product
);

export const selectError = createSelector(
  selectProductState,
  (state: ProductState) => state.error
);

export const selectLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);
