import { Request, Response } from "express";
import HttpStatusCodes from "http-status-codes";
import * as UserService from "../service/user";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("UserController");
/**
 * Get all users.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function getUsers(req: Request, res: Response) {
  const data = UserService.getUsers();
  res.json(data);
}

/**
 * Get a user by their ID.
 * @param {Request} req - The Express Request object containing the user ID in req.params.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  const data = UserService.getUserById(id);
  logger.info("Called getUserById");
  res.status(HttpStatusCodes.OK).json(data);
}

/**
 * Create a new user.
 * @param {Request} req - The Express Request object containing user data in req.body.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export async function createUser(req: Request, res: Response) {
  const { body } = req;
  const data = await UserService.createUser(body);
  console.log(data);
  res.json(data);
}

/**
 * Update a user by their ID.
 * @param {Request} req - The Express Request object containing the user ID in req.params and updated user data in req.body.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { body } = req;

  const data = UserService.updateUser(id, body);

  res.json(data);
}

/**
 * Delete a user by their ID.
 * @param {Request} req - The Express Request object containing the user ID in req.params.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const data = UserService.deleteUser(id);
  res.json(data);
}
