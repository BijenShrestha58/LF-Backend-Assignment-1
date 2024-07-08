import { IUser } from "../interfaces/user";
import * as UserModel from "../model/user";

/**
 * Get all users.
 * @returns {IUser[]} An array of user objects.
 */
export function getUsers(): IUser[] {
  const data = UserModel.getUsers();
  return data;
}

/**
 * Get a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {IUser | { error: string }} The user object if found, otherwise an error object.
 */
export function getUserById(id: string): IUser | { error: string } {
  const data = UserModel.getUserById(id);
  if (!data) {
    return {
      error: `User with id ${id} not found`,
    };
  }
  return data;
}

/**
 * Create a new user.
 * @param {IUser} user - The user object to create.
 * @returns {{ message: string }} A message indicating the user creation.
 */
export function createUser(user: IUser): { message: string } {
  UserModel.createUser(user);
  return { message: "User Created" };
}

/**
 * Update a user by their ID.
 * @param {string} id - The ID of the user to update.
 * @param {IUser} user - The updated user object.
 * @returns {{ message: string } | { error: string }} A message indicating the user update or an error object if the user was not found.
 */
export function updateUser(
  id: string,
  user: IUser
): { message: string } | { error: string } {
  const data = UserModel.updateUser(id, user);
  if (data === -1) {
    return {
      error: `User with id ${id} not found`,
    };
  }
  return { message: `User with id ${id} updated` };
}

/**
 * Delete a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {{ message: string } | { error: string }} A message indicating the user deletion or an error object if the user was not found.
 */
export function deleteUser(
  id: string
): { message: string } | { error: string } {
  const data = UserModel.deleteUser(id);
  if (data === -1) {
    return {
      error: `User with id ${id} not found`,
    };
  }
  return { message: `User with id ${id} deleted` };
}
