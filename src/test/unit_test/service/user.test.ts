import sinon from "sinon";
import { updateUser, createUser, getUserById } from "../../../service/user";
import expect from "expect";
import * as UserModel from "../../../model/user";
import { NotFoundError } from "../../../error/NotFoundError";
import bcrypt from "bcrypt";

describe("User Service Test Suite", () => {
  describe("getUserbyId", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(UserModel, "getUserById");
    });

    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });

    it("Should throw error when user is not found", () => {
      userModelGetUserByIdStub.returns(undefined);

      expect(() => getUserById("100")).toThrow(
        new NotFoundError("User with id 100 not found")
      );
    });

    it("Should return the user when user is found", () => {
      const user = {
        id: "1",
        name: "User 1",
        email: "user1@email.com",
        password: "test1234",
        permissions: ["users.get"],
      };
      userModelGetUserByIdStub.returns(user);
      const res = getUserById("1");
      expect(res).toStrictEqual(user);
    });
  });

  describe("createUser", () => {
    let bcryptHashStub: sinon.SinonStub;
    let userModelCreateUserStub: sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = sinon.stub(bcrypt, "hash");
      userModelCreateUserStub = sinon.stub(UserModel, "createUser");
    });

    afterEach(() => {
      bcryptHashStub.restore;
      userModelCreateUserStub.restore;
    });

    it("Should create new user", async () => {
      bcryptHashStub.resolves("hashedPassword");

      const user = {
        id: "1",
        name: "User 1",
        email: "user1@email.com",
        password: "test1234",
        permissions: ["users.get"],
      };

      await createUser(user);

      expect(bcryptHashStub.callCount).toBe(1);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);

      expect(userModelCreateUserStub.callCount).toBe(1);
      expect(userModelCreateUserStub.getCall(0).args).toStrictEqual([
        {
          ...user,
          password: "hashedPassword",
        },
      ]);
    });
  });

  describe("updateUser", () => {
    let bcryptHashStub: sinon.SinonStub;
    let userModelUpdateUserStub: sinon.SinonStub;

    beforeEach(() => {
      bcryptHashStub = sinon.stub(bcrypt, "hash");
      userModelUpdateUserStub = sinon.stub(UserModel, "updateUser");
    });

    afterEach(() => {
      bcryptHashStub.restore;
      userModelUpdateUserStub.restore;
    });

    it("Should update user", async () => {
      bcryptHashStub.resolves("hashedPassword");

      const user = {
        name: "User 1",
        email: "user1@email.com",
        password: "test1234",
        permissions: ["users.get"],
      };

      // await updateUser(user);

      expect(bcryptHashStub.callCount).toBe(1);
      expect(bcryptHashStub.getCall(0).args).toStrictEqual([user.password, 10]);

      expect(userModelUpdateUserStub.callCount).toBe(1);
      expect(userModelUpdateUserStub.getCall(0).args).toStrictEqual([
        {
          ...user,
          password: "hashedPassword",
        },
      ]);
    });
  });
});
