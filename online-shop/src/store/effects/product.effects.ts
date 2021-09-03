import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import Product, { ProductOmitId } from 'src/interfaces/Product';
import { ProductService } from 'src/services/product.service';
import {
  CreateProduct,
  CreateProductError,
  CreateProductSuccess,
  DeleteProduct,
  DeleteProductError,
  DeleteProductSuccess,
  EProductActions,
  GetProduct,
  GetProductError,
  GetProductList,
  GetProductListError,
  GetProductListSuccess,
  GetProductSuccess,
  UpdateProduct,
  UpdateProductError,
  UpdateProductSuccess,
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

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType<CreateProduct>(EProductActions.CreateProduct),
      map((action) => action.payload),
      switchMap((product: ProductOmitId) =>
        this.productService.createProduct(product)
      ),
      switchMap((product: Product) => of(new CreateProductSuccess(product))),
      catchError((error) => of(new CreateProductError(error)))
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType<UpdateProduct>(EProductActions.UpdateProduct),
      map((action) => action.payload),
      switchMap((product: Product) =>
        this.productService.updateProduct(product)
      ),
      switchMap((product: Product) => of(new UpdateProductSuccess(product))),
      catchError((error) => of(new UpdateProductError(error)))
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType<DeleteProduct>(EProductActions.DeleteProduct),
      map((action) => action.payload),
      switchMap((id: string) => this.productService.deleteProduct(id)),
      switchMap((product: Product) => of(new DeleteProductSuccess(product))),
      catchError((error) => of(new DeleteProductError(error)))
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
