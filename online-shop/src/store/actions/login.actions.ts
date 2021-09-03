import { Action } from '@ngrx/store';
import { UserCredential, UserInformation } from 'src/interfaces/User';

export enum ELoginActions {
  LoginUser = 'LOGIN_USER',
  LoginUserSuccess = 'LOGIN_USER_SUCCESS',
  LoginUserError = 'LOGIN_USER_ERROR',
  LoginUserRedirect = 'LOGIN_USER_REDIRECT',
}

export class LoginUser implements Action {
  public readonly type = ELoginActions.LoginUser;
  constructor(public payload: UserCredential) {}
}

export class LoginUserSuccess implements Action {
  public readonly type = ELoginActions.LoginUserSuccess;
  constructor(public payload: UserInformation) {}
}

export class LoginUserError implements Action {
  public readonly type = ELoginActions.LoginUserError;
  constructor(public payload: string) {}
}

export class LoginUserRedirect implements Action {
  public readonly type = ELoginActions.LoginUserRedirect;
}

export type LoginActions = LoginUser | LoginUserSuccess | LoginUserError;
