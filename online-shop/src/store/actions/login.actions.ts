import { Action } from '@ngrx/store';
import { UserCredential, UserInformation } from 'src/interfaces/User';

export enum ELoginActions {
  LoginUser = 'LOGIN_USER',
  LoginUserSuccess = 'LOGIN_USER_SUCCESS',
}

export class LoginUser implements Action {
  public readonly type = ELoginActions.LoginUser;
  constructor(public payload: UserCredential) {}

}

export class LoginUserSuccess implements Action {
  public readonly type = ELoginActions.LoginUserSuccess;
  constructor(public payload: UserInformation) {}
}

export type LoginActions = LoginUser | LoginUserSuccess;