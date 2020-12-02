import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Array<Product> = [
    {
      id: 0,
      name: 'Notebook Basic 15',
      category: 'Laptops',
      price: 956,
    },
    {
      id: 1,
      name: 'Notebook Basic 17',
      category: 'Laptops',
      price: 1249,
    },
    {
      id: 2,
      name: 'Notebook Basic 18',
      category: 'Laptops',
      price: 1570,
    },
    {
      id: 3,
      name: 'Notebook Basic 19',
      category: 'Laptops',
      price: 1650,
    },
    {
      id: 4,
      name: 'ITelO Vault',
      category: 'Accessories',
      price: 299,
    },
    {
      id: 5,
      name: 'Notebook Professional 15',
      category: 'Accessories',
      price: 1999,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
