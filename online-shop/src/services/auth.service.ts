import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserCredential, UserInformation } from 'src/interfaces/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  redirectUrl: string | null = null;

  private userKey = 'loggedUser';

  constructor(private http: HttpClient) {}

  login(credential: UserCredential): Observable<UserInformation> {
    return this.http
      .post<UserInformation>(
        `${environment.serverConnection}/login`,
        credential
      )
      .pipe(
        map((user: UserInformation) => {
          this.isLoggedIn = true;
          localStorage.setItem(this.userKey, JSON.stringify(user));
          return user;
        })
      );
  }

  getLoggedUserRole(): string | null {
    const user = localStorage.getItem(this.userKey);
    if (user) {
      return JSON.parse(user).role;
    }
    return null;
  }
}
