import { IUser } from "../interfaces/user";
import * as UserModel from "../model/user";

export function getUsers() {
  const data = UserModel.getUsers();

  return data;
}

export function getUserById(id: string) {
  const data = UserModel.getUserById(id);

  if (!data) {
    return {
      error: `User with id ${id} not found`,
    };
  }
  return data;
}

export function createUser(user: IUser) {
  UserModel.createUser(user);
  return { message: "USER CREATED" };
}

export function updateUser(id: string, user: IUser) {
  const data = UserModel.updateUser(id, user);

  if (data === -1) {
    return {
      error: `User with id ${id} not found`,
    };
  }
  return { message: `User with id ${id} updated` };
}

export function deleteUser(id: string) {
  const data = UserModel.deleteUser(id);

  if (data === -1) {
    return {
      error: `User with id ${id} not found`,
    };
  }
  return { message: `User with id ${id} deleted` };
}
