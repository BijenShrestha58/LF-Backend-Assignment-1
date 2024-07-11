import { Request } from "../interfaces/auth";
import { Response } from "express";
import * as TaskService from "../service/task";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("TaskController");

/**
 * Get all tasks.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function getTasks(req: Request, res: Response) {
  const data = TaskService.getTasks();
  logger.info("Called getTasks");

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
  logger.info("Called getTaskById");

  res.json(data);
}

/**
 * Get tasks by user ID.
 * @param {Request} req - The Express Request object containing the user ID in req.params.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function getTasksByUserId(req: Request, res: Response) {
  if (!req.user) {
    new UnauthenticatedError("Unauthenticated");
    return;
  }
  const { id } = req.user;
  const data = TaskService.getTasksByUserId(id);
  logger.info("Called getTasksByUserId");

  res.json(data);
}

/**
 * Create a new task.
 * @param {Request} req - The Express Request object containing task data in req.body.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function createTask(req: Request, res: Response) {
  if (!req.user) {
    new UnauthenticatedError("Unauthenticated");
    return;
  }
  const { id } = req.user;
  const { body } = req;
  const data = TaskService.createTask(id, body);
  logger.info("Called createTask");

  res.json(data);
}

/**
 * Update a task by its ID.
 * @param {Request} req - The Express Request object containing the task ID in req.params and updated task data in req.body.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function updateTask(req: Request, res: Response) {
  if (!req.user) {
    new UnauthenticatedError("Unauthenticated");
    return;
  }
  const { id } = req.params;
  const { body } = req;
  const { id: userId } = req.user;
  const data = TaskService.updateTask(id, body, userId);
  logger.info("Called updateTask");

  res.json(data);
}

/**
 * Delete a task by its ID.
 * @param {Request} req - The Express Request object containing the task ID in req.params.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function deleteTask(req: Request, res: Response) {
  if (!req.user) {
    new UnauthenticatedError("Unauthenticated");
    return;
  }
  const { id } = req.params;
  const { id: userId } = req.user;
  const data = TaskService.deleteTask(id, userId);
  logger.info("Called deleteTask");

  res.json(data);
}
