import Product from 'src/interfaces/Product';

export interface ProductState {
  productList: Array<Product>;
  product: Product | null;
  error: string | null;
  loading: boolean;
}

export const initialProductState: ProductState = {
  productList: [],
  product: null,
  error: null,
  loading: false,
};
