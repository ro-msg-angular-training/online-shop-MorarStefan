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
    case EProductActions.CreateProductSuccess: {
      return {
        ...state,
        productList: [...state.productList, action.payload],
      };
    }
    case EProductActions.CreateProductError: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case EProductActions.UpdateProductSuccess: {
      return {
        ...state,
        product: action.payload,
      };
    }
    case EProductActions.UpdateProductError: {
      return {
        ...state,
        error: action.payload,
      };
    }
    case EProductActions.DeleteProductSuccess: {
      return {
        ...state,
        product: null,
      };
    }
    case EProductActions.DeleteProductError: {
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
