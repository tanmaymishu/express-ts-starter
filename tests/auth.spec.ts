import bootstrap from "./bootstrap";
import User from "../src/database/models/User";
import bcrypt from "bcrypt";

describe("auth", () => {
  beforeEach(() => {
    bootstrap();
  });

  describe("authService", () => {
    it("JWT Token for a user can be generated", async () => {
      const user = await User.query().insert({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("password", 10),
      });
    });
  });
});
