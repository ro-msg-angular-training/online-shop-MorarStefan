import { Action } from '@ngrx/store';
import ShoppingCartItem from 'src/interfaces/ShoppingCartItem';

export enum EShoppingCartActions {
  CreateOrder = 'CREATE_ORDER',
  CreateOrderSuccess = 'CREATE_ORDER_SUCCESS',
  CreateOrderError = 'CREATE_ORDER_ERROR',
  AddItem = 'ADD_ITEM',
  AddItemSuccess = 'ADD_ITEM_SUCCESS',
}

export class CreateOrder implements Action {
  public readonly type = EShoppingCartActions.CreateOrder;
  constructor(public payload: Array<ShoppingCartItem>) {}
}

export class CreateOrderSuccess implements Action {
  public readonly type = EShoppingCartActions.CreateOrderSuccess;
}

export class CreateOrderError implements Action {
  public readonly type = EShoppingCartActions.CreateOrderError;
  constructor(public payload: string) {}
}

export class AddItem implements Action {
  public readonly type = EShoppingCartActions.AddItem;
  constructor(public payload: ShoppingCartItem) {}
}

export class AddItemSuccess implements Action {
  public readonly type = EShoppingCartActions.AddItemSuccess;
  constructor(public payload: ShoppingCartItem) {}
}

export type ShoppingCartActions =
  | CreateOrder
  | CreateOrderSuccess
  | CreateOrderError
  | AddItem
  | AddItemSuccess;
