import { Request, Response } from "express";
import { body, check } from "express-validator";
import User from "../database/models/User";
import * as AuthService from "../services/authService";

export const schema = [
  body("firstName").exists(),
  body("lastName").exists(),
  body("password").exists(),
  body("email")
    .exists()
    .bail()
    .isEmail()
    .bail()
    .custom(async (value) => {
      const user = await User.query().findOne("email", value);
      if (user) {
        return Promise.reject("Email has already been taken.");
      }
    }),
];

export async function store(req: Request, res: Response) {
  let user = await AuthService.register(req.body);
  return res.status(201).json({ user });
}
