import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthService } from 'src/services/auth.service';
import { ProductService } from 'src/services/product.service';
import { getInitialState } from 'src/store/state/app.state';

import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  const initialState = getInitialState();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      imports: [RouterTestingModule, MatDialogModule],
      providers: [
        ProductService,
        AuthService,
        provideMockStore({ initialState }),
        { provide: HttpClient, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display original title', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).toEqual('Product Details');
  });

  it('should display product information', () => {
    expect(component.product).toBeTruthy();
  });
});
