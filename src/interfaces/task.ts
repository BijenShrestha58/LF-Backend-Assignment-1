import { status } from "../enums/status";

export interface ITask {
  name: string;
  status: status;
  userId: string;
}
