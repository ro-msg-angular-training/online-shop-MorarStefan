import { Component, OnInit } from '@angular/core';

interface ProductDetails {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: ProductDetails = {
    id: 1,
    name: 'Notebook Basic 17',
    category: 'Laptops',
    image:
      'https://sapui5.hana.ondemand.com/test-resources/sap/ui/documentation/sdk/images/HT-1001.jpg',
    price: 1249,
    description:
      'Notebook Basic 17 with 2,80 GHz quad core, 17" LCD, 4 GB DDR3 RAM, 500 GB Hard Disc, Windows 8 Pro',
  };

  constructor() {}

  ngOnInit(): void {}
}
