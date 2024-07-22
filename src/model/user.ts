import { getUserQuery, ICreateUser, IUser } from "../interfaces/user";
import { BaseModel } from "./base";

export class UserModel extends BaseModel {
  /**
   * Get all users.
   * @returns {IUser[]} An array of user objects.
   */
  static getUsers(filter: getUserQuery) {
    const { q, page, size } = filter;
    const query = this.queryBuilder()
      .select("id", "email", "name")
      .table("users")
      .limit(size)
      .offset((page - 1) * size);
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }
  /**
   * Get a user by their ID.
   * @param {string} id - The ID of the user to retrieve.
   * @returns {IUser | undefined} The user object if found, otherwise undefined.
   */
  static async getUserById(id: string) {
    return await this.queryBuilder()
      .select("*")
      .from("users")
      .where({ id })
      .first();
  }

  /**
   * Create a new user and add it to the users array.
   * @param {IUser} user - The user object to create.
   */
  static async createUser(user: ICreateUser) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    await this.queryBuilder().insert(userToCreate).table("users");
  }

  /**
   * Update a user by their ID.
   * @param {string} id - The ID of the user to update.
   * @param {IUser} targetUser - The updated user object.
   * @returns {number} Index of the updated user in the users array, or -1 if the user was not found.
   */
  static async updateUser(id: string, targetUser: IUser) {
    const userToUpdate = {
      name: targetUser.name,
      email: targetUser.email,
      password: targetUser.password,
      updated_at: new Date(),
    };
    await this.queryBuilder().update(userToUpdate).table("users").where({ id });
  }

  /**
   * Delete a user by their ID.
   * @param {string} id - The ID of the user to delete.
   * @returns {number} Index of the deleted user in the users array, or -1 if the user was not found.
   */
  static async deleteUser(id: string) {
    return await this.queryBuilder().delete().from("users").where({ id });
  }

  /**
   * Retrieves a user object from the users array based on the provided email address.
   * @param {string} email - The email address of the user to retrieve.
   * @returns {IUser|null} The user object if found, or null if no user exists with the provided email.
   */
  static async getUserByEmail(email: string) {
    const result = await this.queryBuilder()
      .select("users.id", "users.email", "users.name", "users.password")
      .from("users")
      .where("users.email", email);

    const permArray = await this.getPermissions(result[0].id);
    result[0].permissions = permArray;
    return result[0];
  }

  static async getPermissions(id: number) {
    const permissionId = await this.queryBuilder()
      .select("permission_id")
      .from("user_permissions")
      .where("user_id", id);

    const permissions = await Promise.all(
      permissionId.map(async (permission) => {
        const result = await this.queryBuilder()
          .select("permissions")
          .from("permissions")
          .where({ id: permission.permission_id });
        return result[0].permissions;
      })
    );
    return permissions;
  }

  static count(filter: getUserQuery) {
    const { q } = filter;
    const query = this.queryBuilder().count("*").table("users").first();
    if (q) {
      query.whereLike("name", `%${q}%`);
    }
    return query;
  }
}
