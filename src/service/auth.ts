import { sign, verify } from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import { createUser, getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import config from "../config";
import { permission } from "process";
import { UnauthenticatedError } from "../error/UnauthenticatedError";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("AuthService");

/**
 * Authenticates a user based on email and password, and generates access and refresh tokens.
 * @param {Pick<IUser, "email" | "password">} body - The object containing user email and password.
 * @returns {Promise<{ accessToken: string, refreshToken: string }>} An object containing access and refresh tokens.
 * @throws {UnauthenticatedError} If authentication fails due to invalid email or password.
 */
export async function login(body: Pick<IUser, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);
  logger.info("Called getUserByEmail");

  if (!existingUser) {
    throw new UnauthenticatedError("Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    throw new UnauthenticatedError("Invalid email or password");
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    permissions: existingUser.permissions,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
  };
}

/**
 * Generates a new access token using a refresh token.
 * @param {string} refreshToken - The refresh token used to generate a new access token.
 * @returns {Promise<{ accessToken: string }>} An object containing the new access token.
 * @throws {UnauthenticatedError} If the refresh token verification fails.
 */
export async function refresh(refreshToken: string) {
  let decoded;
  try {
    decoded = await verify(refreshToken, config.jwt.secret!);
  } catch (e) {
    throw new UnauthenticatedError("Invalid refresh token");
  }

  const { id, name, email, permissions } = decoded as IUser;

  const payload = { id, name, email, permissions };

  const newAccessToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  return {
    accessToken: newAccessToken,
  };
}
