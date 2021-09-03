import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import Product from 'src/interfaces/Product';
import { ProductService } from 'src/services/product.service';
import {
  EProductActions,
  GetProduct,
  GetProductError,
  GetProductList,
  GetProductListError,
  GetProductListSuccess,
  GetProductSuccess,
} from '../actions/product.actions';

@Injectable()
export class ProductEffects {
  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetProduct>(EProductActions.GetProduct),
      map((action) => action.payload),
      switchMap((id: string) => this.productService.getProduct(id)),
      switchMap((product: Product) => of(new GetProductSuccess(product))),
      catchError((error) => of(new GetProductError(error)))
    )
  );

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetProductList>(EProductActions.GetProductList),
      switchMap(() => this.productService.getProducts()),
      switchMap((products: Array<Product>) =>
        of(new GetProductListSuccess(products))
      ),
      catchError((error) => of(new GetProductListError(error)))
    )
  );

  constructor(
    private productService: ProductService,
    private actions$: Actions
  ) {}
}
