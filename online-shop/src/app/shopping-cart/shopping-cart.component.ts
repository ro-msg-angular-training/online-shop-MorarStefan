import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { OrderService } from '../../services/order.service';
import ShoppingCartItem from '../../interfaces/ShoppingCartItem';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItems: Array<ShoppingCartItem> = [];
  displayedColumns: string[] = ['product', 'category', 'price', 'quantity'];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.shoppingCartItems = this.shoppingCartService.getItems();
  }

  createOrder(): void {
    this.orderService
      .createOrder(this.shoppingCartItems)
      .subscribe((data) => console.log(data));
    this.shoppingCartService.emptyShoppingCart();
    this.shoppingCartItems = this.shoppingCartService.getItems();
  }
}