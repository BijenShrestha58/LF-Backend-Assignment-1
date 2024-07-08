import { status } from "../enums/status";
import { ITask } from "../interfaces/task";

const tasks = [
  {
    id: "1",
    name: "Laundry",
    status: status.TODO,
    userId: "1",
  },
  {
    id: "2",
    name: "Assignment",
    status: status.TODO,
    userId: "1",
  },
  {
    id: "3",
    name: "Car wash",
    status: status.TODO,
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
    status: status.TODO,
    userId: "3",
  },
];

export function getTasks() {
  return tasks;
}

export function getTaskById(id: string) {
  return tasks.find(({ id: userId }) => userId === id);
}

export function getTasksByUserId(id: string) {
  return tasks.filter((task) => task.userId === id);
}

export function createTask(task: ITask) {
  tasks.push({ id: `${Number(tasks[tasks.length - 1].id) + 1}`, ...task });
}

export function updateTask(id: string, task: ITask) {
  const targetTaskIndex = tasks.findIndex(({ id: taskId }) => taskId === id);
  tasks[targetTaskIndex] = {
    ...tasks[targetTaskIndex],
    ...task,
  };
  return targetTaskIndex;
}

export function deleteTask(id: string) {
  const targetTaskIndex = tasks.findIndex(({ id: taskId }) => taskId === id);
  tasks.splice(targetTaskIndex, 1);
  return targetTaskIndex;
}
