import { STATUS } from "../enums/status";

export interface ITask {
  id: string;
  name: string;
  status: STATUS;
  userId: string;
}

export interface ICreateTask {
  name: string;
  status: STATUS;
}

export interface getTaskQuery {
  q?: string;
  page?: number;
  size?: number;
}
