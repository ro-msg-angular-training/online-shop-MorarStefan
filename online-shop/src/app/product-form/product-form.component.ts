import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/interfaces/Category';
import Product, { ProductOmitId } from 'src/interfaces/Product';
import { ProductDialogData } from 'src/interfaces/ProductDialogData';
import { Supplier } from 'src/interfaces/Supplier';
import { CategoryService } from 'src/services/category.service';
import { ProductService } from 'src/services/product.service';
import { SupplierService } from 'src/services/supplier.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  categories: Array<Category> = [];
  suppliers: Array<Supplier> = [];
  positiveNumberRegExp: RegExp = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private productService: ProductService,
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogData,
    private formBuilder: FormBuilder
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.categoryService
      .getCategories()
      .subscribe((data) => (this.categories = data));

    this.supplierService
      .getSuppliers()
      .subscribe((data) => (this.suppliers = data));

    this.productForm = this.formBuilder.group({
      name: [
        this.data ? this.data.product.name : null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      description: [
        this.data ? this.data.product.description : null,
        Validators.required,
      ],
      price: [
        this.data ? this.data.product.price : null,
        [Validators.required, Validators.pattern(this.positiveNumberRegExp)],
      ],
      weight: [
        this.data ? this.data.product.weight : null,
        [Validators.required, Validators.pattern(this.positiveNumberRegExp)],
      ],
      category: [
        this.data ? this.data.product.category.name : null,
        Validators.required,
      ],
      supplier: [
        this.data ? this.data.product.supplier.name : null,
        Validators.required,
      ],
      imageUrl: [
        this.data ? this.data.product.imageUrl : null,
        Validators.required,
      ],
    });
  }

  onSubmit(): void {
    if (!this.productForm.valid) {
      return;
    }

    this.data ? this.updateProduct() : this.createProduct();

    this.dialogRef.close();
  }

  private createProduct() {
    const product: ProductOmitId = {
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      weight: this.productForm.value.weight,
      category: {
        name: this.productForm.value.category,
        description: this.getCategoryDescription(
          this.productForm.value.category
        ),
      },
      supplier: {
        name: this.productForm.value.supplier,
      },
      imageUrl: this.productForm.value.imageUrl,
    };

    this.productService.createProduct(product).subscribe();
  }

  private updateProduct() {
    const product: Product = {
      _id: this.data.product._id,
      name: this.productForm.value.name,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      weight: this.productForm.value.weight,
      category: {
        name: this.productForm.value.category,
        description: this.getCategoryDescription(
          this.productForm.value.category
        ),
      },
      supplier: {
        name: this.productForm.value.supplier,
      },
      imageUrl: this.productForm.value.imageUrl,
    };

    this.productService.updateProduct(product).subscribe();
  }

  private getCategoryDescription(categoryName: string): string {
    for (const iterator of this.categories) {
      if (categoryName === iterator.name) {
        return iterator.description;
      }
    }
    return '';
  }
}
