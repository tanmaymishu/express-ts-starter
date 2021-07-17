import { Request, Response } from 'express';
import { body } from 'express-validator';
import User from '../database/models/user';
import * as AuthService from '../services/auth.service';

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

function create(req: Request, res: Response) {
  res.render('register');
}

async function store(req: Request, res: Response) {
  let user = await AuthService.register(req.body);
  if (user) {
    req.flash('message', 'Registration Successful! Please Log In.');
    return res.redirect('/login');
  }
}

export default {
  rules,
  create,
  store
};
