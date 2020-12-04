import { Injectable } from '@angular/core';
import ShoppingCartItem from '../interfaces/ShoppingCartItem';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  shoppingCartItems: Array<ShoppingCartItem> = [];

  addItem(shoppingCartItem: ShoppingCartItem): void {
    this.insertOrUpdateItem(shoppingCartItem);
  }

  getItems(): Array<ShoppingCartItem> {
    return this.shoppingCartItems;
  }

  emptyShoppingCart(): void {
    this.shoppingCartItems.splice(0, this.shoppingCartItems.length);
  }

  private insertOrUpdateItem(shoppingCartItem: ShoppingCartItem): void {
    let isPresent = false;

    const length = this.shoppingCartItems.length;
    for (let index = 0; index < length; index++) {
      if (
        this.shoppingCartItems[index].productId === shoppingCartItem.productId
      ) {
        this.shoppingCartItems[index].quantity += shoppingCartItem.quantity;
        isPresent = true;
        break;
      }
    }

    if (!isPresent) {
      this.shoppingCartItems.push(shoppingCartItem);
    }
  }
}
