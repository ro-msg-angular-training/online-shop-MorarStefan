import { EProductActions, ProductActions } from '../actions/product.actions';
import { initialProductState, ProductState } from '../state/product.state';

export const productReducers = (
  state = initialProductState,
  action: ProductActions
): ProductState => {
  switch (action.type) {
    case EProductActions.GetProductSuccess: {
      return {
        ...state,
        product: action.payload,
      };
    }
    case EProductActions.GetProductError: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case EProductActions.GetProductListSuccess: {
      return {
        ...state,
        productList: action.payload,
      };
    }
    case EProductActions.GetProductListError: {
      return {
        ...state,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
