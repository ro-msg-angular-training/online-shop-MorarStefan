import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Order from '../interfaces/Order';
import OrderItem from '../interfaces/OrderItem';
import ShoppingCartItem from '../interfaces/ShoppingCartItem';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersBackendUrl = 'http://localhost:4000/orders';
  constructor(private http: HttpClient) {}

  createOrder(shoppingCartItems: Array<ShoppingCartItem>): Observable<Order> {
    const order: Order = this.convertShoppingCartToOrder(shoppingCartItems);
    return this.http
      .post<Order>(this.ordersBackendUrl, order)
      .pipe(catchError(this.handleError));
  }

  private convertShoppingCartToOrder(
    shoppingCartItems: Array<ShoppingCartItem>
  ): Order {
    const orderProducts: Array<OrderItem> = [];
    for (const iterator of shoppingCartItems) {
      orderProducts.push({
        productId: iterator.productId,
        quantity: iterator.quantity,
      });
    }
    const order: Order = {
      createdAt: new Date().toString(),
      customerId: '5f9fcb8e7bdb2732ac6fc10a',
      deliveryAddressId: '5fa0ff2d7c5b6910a84f3ee2',
      products: orderProducts,
    };

    return order;
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
