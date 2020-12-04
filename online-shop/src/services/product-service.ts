import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Product from '../interfaces/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsBackendUrl = 'http://localhost:4000/products';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Array<Product>> {
    return this.http
      .get<Array<Product>>(this.productsBackendUrl)
      .pipe(catchError(this.handleError));
  }

  getProduct(productId: String): Observable<Product> {
    return this.http
      .get<Product>(`${this.productsBackendUrl}/${productId}`)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(productId: String): Observable<Product> {
    return this.http
      .delete<Product>(`${this.productsBackendUrl}/${productId}`)
      .pipe(catchError(this.handleError));
  }

  getProductImageApi(productId: String): string {
    return `${this.productsBackendUrl}/${productId}/images`;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
