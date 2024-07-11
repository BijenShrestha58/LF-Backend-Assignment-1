import { status } from "../enums/status";

export interface ITask {
  id: string;
  name: string;
  status: status;
  userId: string;
}

export interface ICreateTask {
  name: string;
  status: status;
}
