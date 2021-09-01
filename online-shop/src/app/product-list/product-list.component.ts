import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Product from '../../interfaces/Product';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [];
  displayedColumns: string[] = ['product', 'category', 'price', 'action'];

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((data) => (this.products = data));
  }

  openProductForm(): void {
    this.dialog.open(ProductFormComponent, {
      width: '500px',
    });
  }

  displayAddButton(): boolean {
    return this.authService.getLoggedUserRole() === 'admin';
  }
}
