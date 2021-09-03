import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginUserRedirect } from 'src/store/actions/login.actions';
import { selectUser } from 'src/store/selectors/user.selectors';
import { AppState } from 'src/store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectUser).pipe(
      map((user) => {
        if (!user) {
          this.store.dispatch(new LoginUserRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
