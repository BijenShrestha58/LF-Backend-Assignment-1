import { ITask } from "../interfaces/task";
import * as TaskModel from "../model/task";

export function getTasks() {
  const data = TaskModel.getTasks();
  return data;
}

export function getTaskById(id: string) {
  const data = TaskModel.getTaskById(id);
  if (!data) {
    return {
      error: `Task with id ${id} not found`,
    };
  }
  return data;
}

export function getTasksByUserId(id: string) {
  const data = TaskModel.getTasksByUserId(id);
  if (!data) {
    return {
      error: `Tasks not found`,
    };
  }
  return data;
}

export function createTask(task: ITask) {
  TaskModel.createTask(task);
  return { message: "Task Created" };
}

export function updateTask(id: string, task: ITask) {
  const data = TaskModel.updateTask(id, task);
  if (data === -1) {
    return {
      error: `Task with id ${id} not found`,
    };
  }
  return { message: `Task with id ${id} updated` };
}

export function deleteTask(id: string) {
  const data = TaskModel.deleteTask(id);

  if (data === -1) {
    return {
      error: `Task with id ${id} not found`,
    };
  }
  return { message: `Task with id ${id} deleted` };
}
