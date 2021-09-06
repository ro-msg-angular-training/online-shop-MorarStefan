import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import ShoppingCartItem from 'src/interfaces/ShoppingCartItem';
import { OrderService } from 'src/services/order.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  EShoppingCartActions,
  CreateOrder,
  CreateOrderSuccess,
  CreateOrderError,
  AddItem,
  AddItemSuccess,
} from '../actions/shopping-cart.actions';

@Injectable()
export class ShoppingCartEffects {
  createOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CreateOrder>(EShoppingCartActions.CreateOrder),
      map((action) => action.payload),
      switchMap((shoppingCartItems: Array<ShoppingCartItem>) =>
        this.orderService.createOrder(shoppingCartItems)
      ),
      switchMap(() => of(new CreateOrderSuccess())),
      catchError((error) => of(new CreateOrderError(error)))
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType<AddItem>(EShoppingCartActions.AddItem),
      map((action) => action.payload),
      switchMap((item: ShoppingCartItem) => of(new AddItemSuccess(item)))
    )
  );

  constructor(private orderService: OrderService, private actions$: Actions) {}
}
