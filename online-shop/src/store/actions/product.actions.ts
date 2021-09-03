import { Action } from '@ngrx/store';
import Product, { ProductOmitId } from 'src/interfaces/Product';

export enum EProductActions {
  GetProduct = 'GET_PRODUCT',
  GetProductSuccess = 'GET_PRODUCT_SUCCESS',
  GetProductError = 'GET_PRODUCT_ERROR',
  CreateProduct = 'CREATE_PRODUCT',
  CreateProductSuccess = 'CREATE_PRODUCT_SUCCESS',
  CreateProductError = 'CREATE_PRODUCT_ERROR',
  UpdateProduct = 'UPDATE_PRODUCT',
  UpdateProductSuccess = 'UPDATE_PRODUCT_SUCCESS',
  UpdateProductError = 'UPDATE_PRODUCT_ERROR',
  DeleteProduct = 'DELETE_PRODUCT',
  DeleteProductSuccess = 'DELETE_PRODUCT_SUCCESS',
  DeleteProductError = 'DELETE_PRODUCT_ERROR',
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

export class CreateProduct implements Action {
  public readonly type = EProductActions.CreateProduct;
  constructor(public payload: ProductOmitId) {}
}

export class CreateProductSuccess implements Action {
  public readonly type = EProductActions.CreateProductSuccess;
  constructor(public payload: Product) {}
}

export class CreateProductError implements Action {
  public readonly type = EProductActions.CreateProductError;
  constructor(public payload: string) {}
}

export class UpdateProduct implements Action {
  public readonly type = EProductActions.UpdateProduct;
  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  public readonly type = EProductActions.UpdateProductSuccess;
  constructor(public payload: Product) {}
}

export class UpdateProductError implements Action {
  public readonly type = EProductActions.UpdateProductError;
  constructor(public payload: string) {}
}

export class DeleteProduct implements Action {
  public readonly type = EProductActions.DeleteProduct;
  constructor(public payload: string) {}
}

export class DeleteProductSuccess implements Action {
  public readonly type = EProductActions.DeleteProductSuccess;
  constructor(public payload: Product) {}
}

export class DeleteProductError implements Action {
  public readonly type = EProductActions.DeleteProductError;
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
  | CreateProduct
  | CreateProductSuccess
  | CreateProductError
  | UpdateProduct
  | UpdateProductSuccess
  | UpdateProductError
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductError
  | GetProductList
  | GetProductListSuccess
  | GetProductListError;
