import { IUser } from "../interfaces/user";

export const users: IUser[] = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: "$2a$10$XQ3983wPW8Su7evc1YJ.bOYFHmloDSUnEv4DJcoFQc4fnQlDuVTnW", //admin
    id: "1",
    permissions: ["admin", "user"],
  },
  {
    name: "user 1",
    email: "user@gmail.com",
    password: "$2b$10$Q0lt2JZR8LXUynB9uhVgSeXIVNKAL4zx0tiISGWdQREvNUF0zK.xe", //thisthat
    id: "2",
    permissions: ["user"],
  },
  {
    id: "3",
    name: "Bijen",
    email: "bijen@gmail.com",
    password: "$2b$10$36hSuF5emU/hZz/6cD.nOe6jPsHGUniGWvnaaSMorrNnJNv.qE9yS", //Bijen@123
    permissions: ["user"],
  },
];
