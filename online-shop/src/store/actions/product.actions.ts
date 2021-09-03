import { Action } from '@ngrx/store';
import Product from 'src/interfaces/Product';

export enum EProductActions {
  GetProduct = 'GET_PRODUCT',
  GetProductSuccess = 'GET_PRODUCT_SUCCESS',
  GetProductError = 'GET_PRODUCT_ERROR',
  GetProductList = 'GET_PRODUCT_LIST',
  GetProductListSuccess = 'GET_PRODUCT_LIST_SUCCESS',
  GetProductListError = 'GET_PRODUCT_LIST_ERROR',
}

export class GetProduct implements Action {
  public readonly type = EProductActions.GetProduct;
  constructor(public payload: string) {}
}

export class GetProductSuccess implements Action {
  public readonly type = EProductActions.GetProductSuccess;
  constructor(public payload: Product) {}
}

export class GetProductError implements Action {
  public readonly type = EProductActions.GetProductError;
  constructor(public payload: string) {}
}

export class GetProductList implements Action {
  public readonly type = EProductActions.GetProductList;
}

export class GetProductListSuccess implements Action {
  public readonly type = EProductActions.GetProductListSuccess;
  constructor(public payload: Array<Product>) {}
}

export class GetProductListError implements Action {
  public readonly type = EProductActions.GetProductListError;
  constructor(public payload: string) {}
}

export type ProductActions =
  | GetProduct
  | GetProductSuccess
  | GetProductError
  | GetProductList
  | GetProductListSuccess
  | GetProductListError;
