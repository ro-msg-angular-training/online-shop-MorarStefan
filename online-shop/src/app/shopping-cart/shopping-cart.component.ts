import { Component, OnInit } from '@angular/core';
import ShoppingCartItem from '../../interfaces/ShoppingCartItem';
import { AppState } from 'src/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectShoppingCart } from 'src/store/selectors/shopping-cart-selectors';
import { CreateOrder } from 'src/store/actions/shopping-cart.actions';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  shoppingCartItems: Array<ShoppingCartItem> = [];
  shoppingCartItems$ = this.store.pipe(select(selectShoppingCart));
  displayedColumns: string[] = ['product', 'category', 'price', 'quantity'];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.shoppingCartItems$.subscribe(
      (data) => (this.shoppingCartItems = data)
    );
  }

  createOrder(): void {
    this.store.dispatch(new CreateOrder(this.shoppingCartItems));
  }
}
