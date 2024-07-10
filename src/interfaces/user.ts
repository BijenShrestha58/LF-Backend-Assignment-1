export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  permissions: string[];
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}
