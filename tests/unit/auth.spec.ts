import * as bootstrap from "../bootstrap";
import User from "../../src/database/models/user";
import bcrypt from "bcrypt";
import * as authService from "../../src/services/auth.service";
import { expect } from "chai";

describe("auth", () => {
  beforeEach(async () => {
    await bootstrap.refreshDB();
  });

  describe("authService", () => {
    it("can generate JWT for a user", async () => {
      process.env.JWT_SECRET = "mysecret";
      const user = await User.query().insert({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("password", 10),
      });
      expect(authService.generateJwt(user)).to.be.a("string");
    });
  });
});
