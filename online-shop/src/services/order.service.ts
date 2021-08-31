import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Order from '../interfaces/Order';
import OrderItem from '../interfaces/OrderItem';
import ShoppingCartItem from '../interfaces/ShoppingCartItem';
import { environment } from 'src/environments/environment';
import { handleError } from './helpers';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  defaultCustomerId = '5f9fcb8e7bdb2732ac6fc10a';
  defaultAddressId = '5fa0ff2d7c5b6910a84f3ee2';

  constructor(private http: HttpClient) {}

  createOrder(shoppingCartItems: Array<ShoppingCartItem>): Observable<Order> {
    const order: Order = this.convertShoppingCartToOrder(shoppingCartItems);
    return this.http
      .post<Order>(`${environment.serverConnection}/orders`, order)
      .pipe(catchError(handleError));
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
      customerId: this.defaultCustomerId,
      deliveryAddressId: this.defaultAddressId,
      products: orderProducts,
    };

    return order;
  }
}
