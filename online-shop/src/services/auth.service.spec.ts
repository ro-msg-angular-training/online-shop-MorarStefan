import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserCredential, UserInformation } from 'src/interfaces/User';
import { AuthService } from './auth.service';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from 'src/store/state/app.state';

describe('AuthService', () => {
  let service: AuthService;
  const httpClientSpy: {
    post: jasmine.Spy;
  } = jasmine.createSpyObj('HttpClient', ['post']);
  let store: MockStore;

  const userInformation: UserInformation = {
    _id: '4c73d626-16b3-4dd8-b24f-8bf7f90df2c1',
    username: 'john.doe',
    fullName: 'John Doe',
    role: 'customer',
  };

  const initialState: Partial<AppState> = {
    user: {
      user: userInformation,
      error: null,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideMockStore({ initialState }),
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
  });

  it('should return the expected user information', (done: DoneFn) => {
    const userCredential: UserCredential = {
      username: 'john.doe',
      password: '1234',
    };

    httpClientSpy.post.and.returnValue(of(userInformation));
    service.login(userCredential).subscribe((data) => {
      expect(data).toEqual(userInformation);
      done();
    }, done.fail);

    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('should return user role', (done: DoneFn) => {
    service.getLoggedUserRole().subscribe((data) => {
      expect(data).toEqual('customer');
      done();
    }, done.fail);
  });
});
