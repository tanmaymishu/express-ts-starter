import { Request, Response } from 'express';
import { body } from 'express-validator';
import User from '../../database/models/user';
import * as AuthService from '../../services/auth.service';

const rules = [
  body('firstName', 'First name is missing').exists(),
  body('lastName', 'Last name is missing').exists(),
  body('password', 'Password is missing').exists(),
  body('email')
    .exists()
    .bail()
    .isEmail()
    .bail()
    .custom(async (value) => {
      const user = await User.query().findOne('email', value);
      if (user) {
        return Promise.reject('Email has already been taken.');
      }
    })
];

async function store(req: Request, res: Response) {
  let user = await AuthService.register(req.body);

  return res.status(201).json({ user });
}

export { rules, store };
