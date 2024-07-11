import { ITask } from "../interfaces/task";
import { status } from "../enums/status";

export const tasks: ITask[] = [
  {
    id: "1",
    name: "Laundry",
    status: status.TODO,
    userId: "1",
  },
  {
    id: "2",
    name: "Assignment",
    status: status.IN_PROGRESS,
    userId: "1",
  },
  {
    id: "3",
    name: "Car wash",
    status: status.IN_PROGRESS,
    userId: "2",
  },
  {
    id: "4",
    name: "Assignment",
    status: status.TODO,
    userId: "2",
  },
  {
    id: "5",
    name: "Cooking",
    status: status.TODO,
    userId: "2",
  },
  {
    id: "6",
    name: "Laundry",
    status: status.COMPLETED,
    userId: "3",
  },
];
