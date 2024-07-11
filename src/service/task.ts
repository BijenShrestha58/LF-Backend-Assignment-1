import { userInfo } from "os";
import { ICreateTask, ITask } from "../interfaces/task";
import * as TaskModel from "../model/task";
import { ForbiddenError } from "../error/ForbiddenError";
import { NotFoundError } from "../error/NotFoundError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TaskService");

/**
 * Get all tasks.
 * @returns {ITask[]} An array of tasks.
 */
export function getTasks(): ITask[] {
  const data = TaskModel.getTasks();
  logger.info("Called getTasks");

  return data;
}

/**
 * Get a task by its ID.
 * @param {string} id - The ID of the task to retrieve.
 * @returns {ITask} The task object if found, otherwise an error object.
 * @throws {NotFoundError} If no task is found with the provided ID.
 */
export function getTaskById(id: string): ITask {
  const data = TaskModel.getTaskById(id);
  logger.info("Called getTaskById");

  if (!data) {
    throw new NotFoundError(`Task with id ${id} not found`);
  }
  return data;
}

/**
 * Get tasks by user ID.
 * @param {string} id - The ID of the user whose tasks are to be retrieved.
 * @returns {ITask[]} An array of tasks belonging to the user if found, otherwise an error object.
 * @throws {NotFoundError} If no tasks are found for the user.
 */
export function getTasksByUserId(id: string): ITask[] {
  const data = TaskModel.getTasksByUserId(id);
  logger.info("Called getTasksByUserId");

  if (!data) {
    throw new NotFoundError("Tasks not found");
  }
  return data;
}
/**
 * Creates a new task.
 * @param {string} userId - The ID of the user creating the task.
 * @param {ICreateTask} task - The task object to create.
 * @returns {{ message: string }} A message indicating the task creation.
 */
export function createTask(
  userId: string,
  task: ICreateTask
): { message: string } {
  TaskModel.createTask(userId, task);
  logger.info("Called createTask");

  return { message: "Task Created" };
}

/**
 * Updates a task by its ID.
 * @param {string} id - The ID of the task to update.
 * @param {ITask} task - The updated task object.
 * @param {string} userId - The ID of the user performing the update.
 * @returns { message: string } A message indicating the task update or an error object if the task was not found or the update is forbidden.
 * @throws {NotFoundError} If no task is found with the provided ID.
 * @throws {ForbiddenError} If the user does not have permission to update the task.
 */
export function updateTask(
  id: string,
  task: ITask,
  userId: string
): { message: string } {
  const data = TaskModel.updateTask(id, task, userId);
  logger.info("Called updateTask");

  if (data === -1) {
    throw new NotFoundError("Task not found");
  }
  if (data === -2) {
    throw new ForbiddenError("Can only update user's own tasks");
  }

  return { message: `Task with id ${id} updated` };
}

/**
 * Deletes a task from the database by its ID.
 * @param {string} id - The ID of the task to delete.
 * @param {string} userId - The ID of the user performing the deletion.
 * @returns { message: string } A message indicating the task deletion or an error object if the task was not found or the deletion is forbidden.
 * @throws {NotFoundError} If no task is found with the provided ID.
 * @throws {ForbiddenError} If the user does not have permission to delete the task.
 */
export function deleteTask(id: string, userId: string): { message: string } {
  const data = TaskModel.deleteTask(id, userId);
  logger.info("Called deleteTask");

  if (data === -1) {
    throw new NotFoundError("Task not found");
  }
  if (data === -2) {
    throw new ForbiddenError("Can only delete user's own tasks");
  }

  return { message: `Task with id ${id} deleted` };
}
