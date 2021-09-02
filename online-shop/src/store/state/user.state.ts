import { UserInformation } from 'src/interfaces/User';

export interface UserState {
  user: UserInformation | null;
}

export const initialUserState: UserState = {
  user: null,
};
