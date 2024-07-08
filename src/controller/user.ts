import { Request, Response } from "express";

import * as UserService from "../service/user";

export function getUsers(req: Request, res: Response) {
  const data = UserService.getUsers();
  res.json(data);
}

export function getUserById(req: Request, res: Response) {
  const { id } = req.params;

  const data = UserService.getUserById(id);

  res.json(data);
}

export function createUser(req: Request, res: Response) {
  const { body } = req;
  UserService.createUser(body);
  res.json(body);
}

export function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  const { body } = req;

  const data = UserService.updateUser(id, body);

  res.json(data);
}

export function deleteUser(req: Request, res: Response) {
  const { id } = req.params;
  const data = UserService.deleteUser(id);
  res.json(data);
}
