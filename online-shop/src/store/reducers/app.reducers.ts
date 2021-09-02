import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { loginReducers } from './login.reducers';

export const appReducers: ActionReducerMap<AppState, any> = {
  user: loginReducers,
};
