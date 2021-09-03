import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserCredential, UserInformation } from 'src/interfaces/User';
import { selectUser } from 'src/store/selectors/user.selectors';
import { AppState } from 'src/store/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(credential: UserCredential): Observable<UserInformation> {
    return this.http.post<UserInformation>(
      `${environment.serverConnection}/login`,
      credential
    );
  }

  getLoggedUserRole(): Observable<string | null> {
    return this.store.select(selectUser).pipe(
      map((user) => {
        if (!user) {
          return null;
        }
        return user.role;
      }),
      take(1)
    );
  }
}
