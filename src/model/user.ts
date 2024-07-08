import { IUser } from "../interfaces/user";

const users = [
  {
    id: "1",
    name: "Bijen",
  },
  {
    id: "2",
    name: "Binod",
  },
  {
    id: "3",
    name: "Babin",
  },
];

export function getUsers() {
  return users;
}

export function getUserById(id: string) {
  return users.find(({ id: userId }) => userId === id);
}

export function createUser(user: IUser) {
  users.push({
    id: `${Number(users[users.length - 1].id) + 1}`,
    ...user,
  });
}

export function updateUser(id: string, targetUser: IUser) {
  const targetUserIndex = users.findIndex(({ id: userId }) => userId === id);
  users[targetUserIndex] = {
    ...users[targetUserIndex],
    ...targetUser,
  };
  return targetUserIndex;
}

export function deleteUser(id: string) {
  const targetUserIndex = users.findIndex(({ id: userId }) => userId === id);
  users.splice(targetUserIndex, 1);
  return targetUserIndex;
}
