import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import Product from '../../interfaces/Product';
import ShoppingCartItem from '../../interfaces/ShoppingCartItem';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { AuthService } from 'src/services/auth.service';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/store/state/app.state';
import { selectProduct } from 'src/store/selectors/product.selectors';
import { DeleteProduct, GetProduct } from 'src/store/actions/product.actions';
import { AddItem } from 'src/store/actions/shopping-cart.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId = '';
  imageApi = '';
  product!: Product;
  product$ = this.store.pipe(select(selectProduct));
  displayEditDeleteButtons = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private store: Store<AppState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.product = this.getDefaultProduct();
    this.productId = this.route.snapshot.params.id;
    this.store.dispatch(new GetProduct(this.productId));
    this.product$.subscribe((data) => {
      if (data) this.product = data;
    });

    this.imageApi = this.productService.getProductImageApi(this.productId);

    this.authService.getLoggedUserRole().subscribe((role) => {
      if (role && role === 'admin') {
        this.displayEditDeleteButtons = true;
      }
    });
  }

  deleteProduct(): void {
    this.store.dispatch(new DeleteProduct(this.productId));
  }

  addProductToShoppingCart(): void {
    this.store.dispatch(new AddItem(this.getShoppingCartItem()));
  }

  openProductForm(): void {
    this.dialog.open(ProductFormComponent, {
      width: '500px',
      data: { product: this.product },
    });
  }

  private getDefaultProduct(): Product {
    const defaultProduct: Product = {
      _id: '',
      name: '',
      description: '',
      category: {
        name: '',
        description: '',
      },
      supplier: {
        name: '',
      },
      price: 0,
      weight: 0,
      imageUrl: '',
    };
    return defaultProduct;
  }

  private getShoppingCartItem(): ShoppingCartItem {
    const shoppingCartItem: ShoppingCartItem = {
      productId: this.product._id,
      productName: this.product.name,
      categoryName: this.product.category.name,
      price: this.product.price,
      quantity: 1,
    };
    return shoppingCartItem;
  }
}
