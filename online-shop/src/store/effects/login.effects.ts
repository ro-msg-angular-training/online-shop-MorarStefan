import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import {
  ELoginActions,
  LoginUser,
  LoginUserSuccess,
} from '../actions/login.actions';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoginUser>(ELoginActions.LoginUser),
      map((action) => action.payload),
      switchMap((credential) => this.authService.login(credential)),
      switchMap((user) => of(new LoginUserSuccess(user)))
    )
  );

  constructor(private authService: AuthService, private actions$: Actions) {}
}
