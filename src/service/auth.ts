import { sign, verify } from "jsonwebtoken";
import { IUser } from "../interfaces/user";
import { createUser, getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import config from "../config";
import { permission } from "process";

export async function login(body: Pick<IUser, "email" | "password">) {
  const existingUser = getUserByEmail(body.email);

  if (!existingUser) {
    return {
      error: "Invalid email or password",
    };
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    return {
      error: "Invalid email or password",
    };
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

export async function refresh(refreshToken: string) {
  const decoded = await verify(refreshToken, config.jwt.secret!);
  const { id, name, email, permissions } = decoded as IUser;

  const payload = { id, name, email, permissions };

  const newAccessToken = await sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });
  return {
    accessToken: newAccessToken,
  };
}
