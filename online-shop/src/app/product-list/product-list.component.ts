import { Component, OnInit } from '@angular/core';
import Product from '../../interfaces/Product';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { AuthService } from 'src/services/auth.service';
import { AppState } from 'src/store/state/app.state';
import { select, Store } from '@ngrx/store';
import { selectProductList } from 'src/store/selectors/product.state';
import { GetProductList } from 'src/store/actions/product.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [];
  displayedColumns: string[] = ['product', 'category', 'price', 'action'];
  products$ = this.store.pipe(select(selectProductList));
  displayAddButton = false;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new GetProductList());
    this.products$.subscribe((data) => (this.products = data));

    this.authService.getLoggedUserRole().subscribe((role) => {
      if (role && role === 'admin') {
        this.displayAddButton = true;
      }
    });
  }

  openProductForm(): void {
    this.dialog.open(ProductFormComponent, {
      width: '500px',
    });
  }
}
