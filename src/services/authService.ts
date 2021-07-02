import User from "../database/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(body: any) {
  let user = await User.query().insert({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
  });

  const token = generateJwt(user);

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: token,
  };
}

export async function login(body: any) {
  const user = await User.query().findOne("email", body.email);
  if (!user || !bcrypt.compareSync(body.password, user.password)) {
    throw new Error("User not found");
  }
  const token = generateJwt(user);
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: token,
  };
}

export function generateJwt(user: User) {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT secret not set");
  }
  return jwt.sign(
    {
      sub: user.$id,
      iat: Date.now(),
      iss: "api.example.com",
      aud: "app.example.com",
    },
    process.env.JWT_SECRET
  );
}
