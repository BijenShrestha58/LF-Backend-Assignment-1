import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import HttpStatusCodes from "http-status-codes";
import * as UserService from "../service/user";
import loggerWithNameSpace from "../utils/logger";
import { getUserQuery } from "../interfaces/user";

const logger = loggerWithNameSpace("UserController");
/**
 * Get all users.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export async function getUsers(
  req: Request<any, any, any, getUserQuery>,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Called getUsers");
    const { query } = req;
    const data = await UserService.getUsers(query);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(); // pass error to the error handling middleware
  }
}
/**
 * Get a user by their ID.
 * @param {Request} req - The Express Request object containing the user ID in req.params.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export async function getUserById(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    logger.info("Called getUserbyId");
    const data = await UserService.getUserById(id);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(); // pass error to the error handling middleware
  }
}

/**
 * Create a new user.
 * @param {Request} req - The Express Request object containing user data in req.body.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    logger.info("Called createUser");
    await UserService.createUser(body);
    res.status(HttpStatusCodes.OK).json({
      message: "User created",
    });
  } catch (error) {
    next();
  }
}

/**
 * Update a user by their ID.
 * @param {Request} req - The Express Request object containing the user ID in req.params and updated user data in req.body.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export async function updateUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    logger.info("Called updateUserById");
    const id = req.params.id;
    const updatedUserData = req.body;
    const updatedUser = await UserService.updateUser(id, updatedUserData);
    res.status(HttpStatusCodes.OK).json({ message: "User updated" });
  } catch (error) {
    next();
  }
}

/**
 * Delete a user by their ID.
 * @param {Request} req - The Express Request object containing the user ID in req.params.
 * @param {Response} res - The Express Response object.
 * @returns {void}
 */
export async function deleteUser(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params; //extract the user ID
    res.status(HttpStatusCodes.OK).json(await UserService.deleteUser(id)); //delete specific user
  } catch (error) {
    next();
  }
}
