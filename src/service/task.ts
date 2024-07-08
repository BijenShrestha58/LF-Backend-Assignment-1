import { ITask } from "../interfaces/task";
import * as TaskModel from "../model/task";

/**
 * Get all tasks.
 * @returns {ITask[]} An array of tasks.
 */
export function getTasks(): ITask[] {
  const data = TaskModel.getTasks();
  return data;
}

/**
 * Get a task by its ID.
 * @param {string} id - The ID of the task to retrieve.
 * @returns {ITask | { error: string }} The task object if found, otherwise an error object.
 */
export function getTaskById(id: string): ITask | { error: string } {
  const data = TaskModel.getTaskById(id);
  if (!data) {
    return {
      error: `Task with id ${id} not found`,
    };
  }
  return data;
}

/**
 * Get tasks by user ID.
 * @param {string} id - The ID of the user whose tasks are to be retrieved.
 * @returns {ITask[] | { error: string }} An array of tasks belonging to the user if found, otherwise an error object.
 */
export function getTasksByUserId(id: string) {
  const data = TaskModel.getTasksByUserId(id);
  if (!data) {
    return {
      error: `Tasks not found`,
    };
  }
  return data;
}

/**
 * Create a new task.
 * @param {ITask} task - The task object to create.
 * @returns {{ message: string }} A message indicating the task creation.
 */
export function createTask(task: ITask): { message: string } {
  TaskModel.createTask(task);
  return { message: "Task Created" };
}

/**
 * Update a task by its ID.
 * @param {string} id - The ID of the task to update.
 * @param {ITask} task - The updated task object.
 * @returns {{ message: string } | { error: string }} A message indicating the task update or an error object if the task was not found.
 */
export function updateTask(
  id: string,
  task: ITask
): { message: string } | { error: string } {
  const data = TaskModel.updateTask(id, task);
  if (data === -1) {
    return {
      error: `Task with id ${id} not found`,
    };
  }
  return { message: `Task with id ${id} updated` };
}

/**
 * Delete a task by its ID.
 * @param {string} id - The ID of the task to delete.
 * @returns {{ message: string } | { error: string }} A message indicating the task deletion or an error object if the task was not found.
 */
export function deleteTask(
  id: string
): { message: string } | { error: string } {
  const data = TaskModel.deleteTask(id);

  if (data === -1) {
    return {
      error: `Task with id ${id} not found`,
    };
  }
  return { message: `Task with id ${id} deleted` };
}
