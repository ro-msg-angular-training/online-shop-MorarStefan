import { initialProductState, ProductState } from './product.state';
import { initialUserState, UserState } from './user.state';

export interface AppState {
  user: UserState;
  product: ProductState;
}

export const initialAppState: AppState = {
  user: initialUserState,
  product: initialProductState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
