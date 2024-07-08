import { Request, Response } from "express";
import * as TaskService from "../service/task";

/**
 * Get all tasks.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function getTasks(req: Request, res: Response) {
  const data = TaskService.getTasks();
  res.json(data);
}

/**
 * Get a task by its ID.
 * @param {Request} req - The Express Request object containing the task ID in req.params.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function getTaskById(req: Request, res: Response) {
  const { id } = req.params;

  const data = TaskService.getTaskById(id);

  res.json(data);
}

/**
 * Get tasks by user ID.
 * @param {Request} req - The Express Request object containing the user ID in req.params.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function getTasksByUserId(req: Request, res: Response) {
  const { id } = req.params;
  const data = TaskService.getTasksByUserId(id);
  res.json(data);
}

/**
 * Create a new task.
 * @param {Request} req - The Express Request object containing task data in req.body.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function createTask(req: Request, res: Response) {
  const { body } = req;
  const data = TaskService.createTask(body);
  res.json(data);
}

/**
 * Update a task by its ID.
 * @param {Request} req - The Express Request object containing the task ID in req.params and updated task data in req.body.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { body } = req;
  const data = TaskService.updateTask(id, body);
  res.json(data);
}

/**
 * Delete a task by its ID.
 * @param {Request} req - The Express Request object containing the task ID in req.params.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const data = TaskService.deleteTask(id);
  res.json(data);
}
