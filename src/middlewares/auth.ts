import { NextFunction, Response } from "express";
import config from "../config";
import { sign, verify } from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import { Request } from "../interfaces/auth";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import { ForbiddenError } from "../error/ForbiddenError";

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

export function authorize(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;
    if (!user.permissions.includes(permission)) {
      next(new ForbiddenError("Forbidden"));
    }

    next();
  };
}
