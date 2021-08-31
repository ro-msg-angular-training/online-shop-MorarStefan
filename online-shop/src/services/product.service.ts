import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Product, { ProductOmitId } from '../interfaces/Product';
import { environment } from 'src/environments/environment';
import { handleError } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Array<Product>> {
    return this.http
      .get<Array<Product>>(`${environment.serverConnection}/products`)
      .pipe(catchError(handleError));
  }

  getProduct(productId: String): Observable<Product> {
    return this.http
      .get<Product>(`${environment.serverConnection}/products/${productId}`)
      .pipe(catchError(handleError));
  }

  deleteProduct(productId: String): Observable<Product> {
    return this.http
      .delete<Product>(`${environment.serverConnection}/products/${productId}`)
      .pipe(catchError(handleError));
  }

  createProduct(product: ProductOmitId): Observable<Product> {
    return this.http
      .post<Product>(`${environment.serverConnection}/products`, product)
      .pipe(catchError(handleError));
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${environment.serverConnection}/products`, product)
      .pipe(catchError(handleError));
  }

  getProductImageApi(productId: String): string {
    return `${environment.serverConnection}/products/${productId}/images`;
  }
}
