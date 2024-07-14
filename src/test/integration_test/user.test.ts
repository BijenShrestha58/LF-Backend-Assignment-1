import request from "supertest";
import express from "express";
import router from "../../routes";
import { users } from "../../mockdata/user";

describe("User Integration Test Suite", () => {
  const app = express();

  app.use(express.json());

  app.use(router);

  describe("createUser API Test", async () => {
    it("Should create a new user", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          name: "admin",
          email: "admin@gmail.com",
          password: "admin", //admin
          id: "1",
          permissions: ["admin", "user"],
        });

      console.log(users);
    });
  });
});
