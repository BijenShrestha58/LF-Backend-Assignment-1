import { NextFunction, Response } from "express";
import config from "../config";
import { sign, verify } from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import { Request } from "../interfaces/auth";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { ForbiddenError } from "../error/ForbiddenError";

/**
 * Middleware to authenticate requests using JWT bearer tokens.
 * @param {Request} req - The request object containing headers with authorization token.
 * @param {Response} res - The response object to handle authentication errors.
 * @param {NextFunction} next - The next function to pass control to the next middleware.
 * @throws {UnauthenticatedError} If token is missing, malformed, or verification fails.
 */
export function authenticate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new UnauthenticatedError("Token not found"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new UnauthenticatedError("Unauthenticated"));
    return;
  }
  if (!config.jwt.secret) {
    next(new Error("Error"));
    return;
  }

  try {
    const user = verify(token[1], config.jwt.secret) as IUser;
    req.user = user;
  } catch (e) {
    throw new UnauthenticatedError("Unauthenticated");
  }

  next();
}

/**
 * Middleware to authorize users based on permissions.
 * @param {string} permission - The permission string to check against user's permissions.
 * @returns {Function} Express middleware function to handle authorization.
 */
export function authorize(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    if (!user.permissions.includes(permission)) {
      next(new ForbiddenError("Forbidden"));
    }

    next();
  };
}
