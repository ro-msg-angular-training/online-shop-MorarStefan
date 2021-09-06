import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { loginReducers } from './login.reducers';
import { productReducers } from './product.reducers';
import { shoppingCartReducers } from './shopping-cart.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  user: loginReducers,
  product: productReducers,
  shoppingCart: shoppingCartReducers,
};
