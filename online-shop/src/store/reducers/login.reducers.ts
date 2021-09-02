import { ELoginActions, LoginActions } from '../actions/login.actions';
import { initialUserState, UserState } from '../state/user.state';

export const loginReducers = (
  state = initialUserState,
  action: LoginActions
): UserState => {
  switch (action.type) {
    case ELoginActions.LoginUserSuccess: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default:
      return state;
  }
};
