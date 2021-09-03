import { UserInformation } from 'src/interfaces/User';

export interface UserState {
  user: UserInformation | null;
  error: string | null;
}

export const initialUserState: UserState = {
  user: null,
  error: null,
};
