import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from 'src/services/auth.service';
import {
  ELoginActions,
  LoginUser,
  LoginUserError,
  LoginUserSuccess,
} from '../actions/login.actions';

@Injectable()
export class LoginEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoginUser>(ELoginActions.LoginUser),
      map((action) => action.payload),
      switchMap((credential) =>
        this.authService.login(credential).pipe(
          map((user) => new LoginUserSuccess(user)),
          catchError((error) => of(new LoginUserError(error.message)))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<LoginUserSuccess>(ELoginActions.LoginUserSuccess),
        tap(() => this.router.navigate(['/products']))
      ),
    { dispatch: false }
  );

  loginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<LoginUserError>(ELoginActions.LoginUserError),
        tap(() =>
          this.snackBar.open('Invalid credentials', 'Close', {
            duration: 3000,
          })
        )
      ),
    { dispatch: false }
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ELoginActions.LoginUserRedirect),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private authService: AuthService,
    private actions$: Actions,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
}
