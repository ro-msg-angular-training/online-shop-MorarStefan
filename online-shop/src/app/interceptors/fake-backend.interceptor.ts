import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User, UserInformation } from 'src/interfaces/User';
import * as data from 'src/assets/users.json';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    switch (true) {
      case request.url.endsWith('/login') && request.method === 'POST':
        return authenticate();
      default:
        return next.handle(request);
    }

    function authenticate() {
      const users: Array<User> = (data as any).default;
      const user = users.find(
        (currentUser: User) =>
          currentUser.username === request.body.username &&
          currentUser.password === request.body.password
      );
      if (!user)
        return throwError({
          error: { message: 'Username or password is incorrect' },
        });

      const response: UserInformation = {
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      };
      return of(new HttpResponse({ status: 200, body: response }));
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
