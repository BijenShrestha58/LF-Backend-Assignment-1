import { status } from "../enums/status";
import { ForbiddenError } from "../error/ForbiddenError";
import { ICreateTask, ITask } from "../interfaces/task";

const tasks: ITask[] = [
  {
    id: "1",
    name: "Laundry",
    status: status.TODO,
    userId: "1",
  },
  {
    id: "2",
    name: "Assignment",
    status: status.TODO,
    userId: "1",
  },
  {
    id: "3",
    name: "Car wash",
    status: status.TODO,
    userId: "2",
  },
  {
    id: "4",
    name: "Assignment",
    status: status.TODO,
    userId: "2",
  },
  {
    id: "5",
    name: "Cooking",
    status: status.TODO,
    userId: "2",
  },
  {
    id: "6",
    name: "Laundry",
    status: status.TODO,
    userId: "3",
  },
];

/**
 * Get all tasks.
 * @returns {ITask[]} An array of task objects.
 */
export function getTasks(): ITask[] {
  return tasks;
}

/**
 * Get a task by its ID.
 * @param {string} id - The ID of the task to retrieve.
 * @returns {ITask | undefined} The task object if found, otherwise undefined.
 */
export function getTaskById(id: string): ITask | undefined {
  return tasks.find((task) => task.id === id);
}

/**
 * Get tasks by user ID.
 * @param {string} id - The ID of the user whose tasks are to be retrieved.
 * @returns {ITask[]} An array of task objects belonging to the user.
 */
export function getTasksByUserId(id: string): ITask[] {
  return tasks.filter((task) => task.userId === id);
}

/**
 * Create a new task and add it to the tasks array.
 * @param {ITask} task - The task object to create.
 */
export function createTask(userId: string, task: ICreateTask): void {
  const newId = `${Number(tasks[tasks.length - 1].id) + 1}`;
  tasks.push({ id: newId, ...task, userId: userId });
}

/**
 * Update a task by its ID.
 * @param {string} id - The ID of the task to update.
 * @param {ITask} task - The updated task object.
 * @returns {number} Index of the updated task in the tasks array, or -1 if the task was not found.
 */
export function updateTask(id: string, task: ITask, userId: string): number {
  const targetTaskIndex = tasks.findIndex((t) => t.id === id);
  if (targetTaskIndex === -1) {
    return targetTaskIndex;
  }
  if (tasks[targetTaskIndex].userId !== userId) {
    throw new ForbiddenError("Can only update user's own tasks");
  }
  tasks[targetTaskIndex] = { ...tasks[targetTaskIndex], ...task };
  return targetTaskIndex;
}

/**
 * Delete a task by its ID.
 * @param {string} id - The ID of the task to delete.
 * @returns {number} Index of the deleted task in the tasks array, or -1 if the task was not found.
 */
export function deleteTask(id: string, userId: string): number {
  const targetTaskIndex = tasks.findIndex((t) => t.id === id);
  if (targetTaskIndex === -1) {
    return targetTaskIndex;
  }
  if (tasks[targetTaskIndex].userId !== userId) {
    throw new ForbiddenError("Can only delete user's own tasks");
  }
  tasks.splice(targetTaskIndex, 1);
  return targetTaskIndex;
}
