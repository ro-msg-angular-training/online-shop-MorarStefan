import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';
import Product from '../../interfaces/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  productId = '';
  imageApi = '';
  product: Product = this.getDefaultProduct();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.productId = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService
      .getProduct(this.productId)
      .subscribe((data) => (this.product = data));
    this.imageApi = this.productService.getProductImageApi(this.productId);
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.productId).subscribe();
  }

  getDefaultProduct(): Product {
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
}
