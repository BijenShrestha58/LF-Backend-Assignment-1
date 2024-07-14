import { ConflictError } from "../error/ConflictError";
import { NotFoundError } from "../error/NotFoundError";
import { ICreateUser, IUser } from "../interfaces/user";
import * as UserModel from "../model/user";
import bcrypt from "bcrypt";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserService");

/**
 * Get all users.
 * @returns {IUser[]} An array of user objects.
 */
export function getUsers(): IUser[] {
  const data = UserModel.getUsers();
  logger.info("Called getUsers");
  return data;
}

/**
 * Retrieves a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {IUser} The user object if found.
 * @throws {NotFoundError} If no user is found with the provided ID.
 */
export function getUserById(id: string) {
  const data = UserModel.getUserById(id);
  logger.info("Called getUserById");
  if (!data) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return data;
}

/**
 * Creates a new user in the database.
 * @param {ICreateUser} user - The user object to create.
 * @returns {Promise<{ message: string }>} A promise that resolves to a message indicating the user creation.
 * @throws {ConflictError} If a user with the same email already exists.
 */
export async function createUser(user: ICreateUser) {
  if (getUserByEmail(user.email)) {
    throw new ConflictError("User with this email exists");
  }
  const password = await bcrypt.hash(user.password, 10);
  UserModel.createUser({
    ...user,
    password,
  });
  logger.info("Called createUser");
  return { message: "User Created" };
}

/**
 * Updates a user by their ID.
 * @param {string} id - The ID of the user to update.
 * @param {IUser} user - The updated user object.
 * @returns {{ message: string }} A message indicating the user update.
 * @throws {NotFoundError} If no user is found with the provided ID.
 */
export function updateUser(
  id: string,
  user: IUser
): { message: string } | { error: string } {
  const data = UserModel.updateUser(id, user);
  logger.info("Called updateUser");

  if (data === -1) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return { message: `User with id ${id} updated` };
}

/**
 * Deletes a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {{ message: string }} A message indicating the user deletion.
 * @throws {NotFoundError} If no user is found with the provided ID.
 */
export function deleteUser(
  id: string
): { message: string } | { error: string } {
  const data = UserModel.deleteUser(id);
  logger.info("Called deleteUser");
  if (data === -1) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  return { message: `User with id ${id} deleted` };
}

/**
 * Retrieves a user from the database by their email address.
 * @param {string} email - The email address of the user to retrieve.
 * @returns {IUser | null} The user object if found, or null if no user exists with the provided email.
 */
export function getUserByEmail(email: string) {
  const data = UserModel.getUserByEmail(email);
  logger.info("Called getUserByEmail");
  return data;
}

export function add(a, b) {
  return a + b;
}
