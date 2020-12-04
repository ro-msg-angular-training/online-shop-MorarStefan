import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import Product from '../../interfaces/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService
      .getProducts()
      .subscribe((data) => (this.products = data));
  }
}
