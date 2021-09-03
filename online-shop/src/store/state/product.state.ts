import Product from 'src/interfaces/Product';

export interface ProductState {
  productList: Array<Product>;
  product: Product | null;
  error: string | null;
}

export const initialProductState: ProductState = {
  productList: [],
  product: null,
  error: null,
};
