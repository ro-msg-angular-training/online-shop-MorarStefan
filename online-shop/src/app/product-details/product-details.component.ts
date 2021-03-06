import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import Product from '../../interfaces/Product';
import ShoppingCartItem from '../../interfaces/ShoppingCartItem';

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
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
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

  addProductToShoppingCart(): void {
    this.shoppingCartService.addItem(this.getShoppingCartItem());
    console.log(this.shoppingCartService.getItems());
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

  getShoppingCartItem(): ShoppingCartItem {
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
