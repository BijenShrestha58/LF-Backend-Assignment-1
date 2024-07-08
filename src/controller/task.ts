import { Request, Response } from "express";
import * as TaskService from "../service/task";

export function getTasks(req: Request, res: Response) {
  const data = TaskService.getTasks();
  res.json(data);
}

export function getTaskById(req: Request, res: Response) {
  const { id } = req.params;

  const data = TaskService.getTaskById(id);

  res.json(data);
}

export function getTasksByUserId(req: Request, res: Response) {
  const { id } = req.params;
  const data = TaskService.getTasksByUserId(id);
  res.json(data);
}

export function createTask(req: Request, res: Response) {
  const { body } = req;
  const data = TaskService.createTask(body);
  res.json(data);
}

export function updateTask(req: Request, res: Response) {
  const { id } = req.params;
  const { body } = req;
  const data = TaskService.updateTask(id, body);
  res.json(data);
}

export function deleteTask(req: Request, res: Response) {
  const { id } = req.params;
  const data = TaskService.deleteTask(id);
  res.json(data);
}
