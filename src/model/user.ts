import { IUser } from "../interfaces/user";

const users = [
  {
    id: "1",
    name: "Bijen",
  },
  {
    id: "2",
    name: "Binod",
  },
  {
    id: "3",
    name: "Babin",
  },
];

/**
 * Get all users.
 * @returns {IUser[]} An array of user objects.
 */
export function getUsers(): IUser[] {
  return users;
}

/**
 * Get a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {IUser | undefined} The user object if found, otherwise undefined.
 */
export function getUserById(id: string): IUser | undefined {
  return users.find((user) => user.id === id);
}

/**
 * Create a new user and add it to the users array.
 * @param {IUser} user - The user object to create.
 */
export function createUser(user: IUser): void {
  const newId = `${Number(users[users.length - 1].id) + 1}`;
  users.push({ id: newId, ...user });
}

/**
 * Update a user by their ID.
 * @param {string} id - The ID of the user to update.
 * @param {IUser} targetUser - The updated user object.
 * @returns {number} Index of the updated user in the users array, or -1 if the user was not found.
 */
export function updateUser(id: string, targetUser: IUser): number {
  const targetUserIndex = users.findIndex((user) => user.id === id);
  if (targetUserIndex !== -1) {
    users[targetUserIndex] = { ...users[targetUserIndex], ...targetUser };
  }
  return targetUserIndex;
}

/**
 * Delete a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {number} Index of the deleted user in the users array, or -1 if the user was not found.
 */
export function deleteUser(id: string): number {
  const targetUserIndex = users.findIndex((user) => user.id === id);
  if (targetUserIndex !== -1) {
    users.splice(targetUserIndex, 1);
  }
  return targetUserIndex;
}
