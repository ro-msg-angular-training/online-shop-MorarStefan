import { UserInformation } from 'src/interfaces/User';
import { LoginUserError, LoginUserSuccess } from '../actions/login.actions';
import { initialUserState } from '../state/user.state';
import { loginReducers } from './login.reducers';

describe('LoginUserSuccess', () => {
  it('should return expected user', () => {
    const userInformation: UserInformation = {
      _id: '4c73d626-16b3-4dd8-b24f-8bf7f90df2c1',
      username: 'john.doe',
      fullName: 'John Doe',
      role: 'customer',
    };

    const newState = loginReducers(
      initialUserState,
      new LoginUserSuccess(userInformation)
    );

    expect(newState.user).toEqual(userInformation);
    expect(newState.error).toEqual(null);
  });

  it('should return expected error', () => {
    const newState = loginReducers(
      initialUserState,
      new LoginUserError('Error')
    );

    expect(newState.user).toEqual(null);
    expect(newState.error).toEqual('Error');
  });
});
