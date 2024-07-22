import { STATUS } from "../enums/status";
import { ICreateTask, ITask } from "../interfaces/task";
import { BaseModel } from "./base";

export class TaskModel extends BaseModel {
  /**
   * Get all tasks.
   * @returns {ITask[]} An array of task objects.
   */
  static async getTasks() {
    return await this.queryBuilder().select("*").from("tasks");
  }

  /**
   * Get a task by its ID.
   * @param {string} id - The ID of the task to retrieve.
   * @returns {ITask | undefined} The task object if found, otherwise undefined.
   */
  static async getTaskById(id: string) {
    return await this.queryBuilder()
      .select("*")
      .from("tasks")
      .where({ id })
      .first();
  }

  /**
   * Get tasks by user ID.
   * @param {string} id - The ID of the user whose tasks are to be retrieved.
   * @returns {ITask[]} An array of task objects belonging to the user.
   */
  static async getTasksByUserId(id: string) {
    return await this.queryBuilder()
      .select("*")
      .from("tasks")
      .where({ userId: id });
  }

  /**
   * Create a new task and add it to the tasks array.
   * @param {ITask} task - The task object to create.
   */
  static async createTask(userId: string, task: ICreateTask) {
    const taskToCreate = {
      name: task.name,
      status_id: this.statusToStatusId(task.status),
      user_id: userId,
    };
    await this.queryBuilder().insert(taskToCreate).table("tasks");
  }

  static statusToStatusId(status: STATUS) {
    switch (status) {
      case STATUS.TODO:
        return 1;
      case STATUS.IN_PROGRESS:
        return 2;
      case STATUS.COMPLETED:
        return 3;
    }
  }

  /**
   * Update a task by its ID.
   * @param {string} id - The ID of the task to update.
   * @param {ITask} task - The updated task object.
   * @returns {number} Index of the updated task in the tasks array, or -1 if the task was not found.
   */
  static async updateTask(id: string, task: ITask, userId: string) {
    const taskToUpdate = {
      name: task.name,
      status_id: this.statusToStatusId(task.status),
      updated_at: new Date(),
    };
    await this.queryBuilder().update(taskToUpdate).table("tasks").where({ id });
  }

  /**
   * Delete a task by its ID.
   * @param {string} id - The ID of the task to delete.
   * @returns {number} Index of the deleted task in the tasks array, or -1 if the task was not found.
   */
  static async deleteTask(id: string, userId: string) {
    return await this.queryBuilder().delete().from("tasks").where({ id });
  }
}
