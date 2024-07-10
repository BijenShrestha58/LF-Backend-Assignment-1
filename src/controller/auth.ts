import { Response, Request } from "express";
import * as AuthService from "../service/auth";

export async function login(req: Request, res: Response) {
  const { body } = req;

  const data = await AuthService.login(body);

  res.json(data);
}

export async function refresh(req: Request, res: Response) {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "Refresh token is required" });
  }

  const data = await AuthService.refresh(refreshToken);
  res.json(data);
}
