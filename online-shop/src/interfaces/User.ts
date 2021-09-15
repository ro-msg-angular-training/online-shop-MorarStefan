export interface User {
  _id: string;
  username: string;
  password: string;
  fullName: string;
  role: string;
}

export type UserCredential = Omit<User, '_id' | 'fullName' | 'role'>;

export type UserInformation = Omit<User, 'password'>;
