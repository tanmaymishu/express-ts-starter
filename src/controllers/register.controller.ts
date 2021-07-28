import { Request, Response } from 'express';
import { body } from 'express-validator';
import { Controller, Get, Post, Req, Res, UseBefore } from 'routing-controllers';
import User from '../database/models/user';
import auth from '../middleware/auth.middleware';
import validate from '../middleware/validation.middleware';
import * as AuthService from '../services/auth.service';

@Controller()
export class RegisterController {
  static rules = [
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

  @Get('/register')
  @UseBefore(auth.guest)
  create(@Req() req: Request, @Res() res: Response) {
    res.render('register');
    return res;
  }

  @Post('/register')
  @UseBefore(auth.guest)
  @UseBefore(validate(RegisterController.rules))
  async store(@Req() req: Request, @Res() res: Response) {
    let user = await AuthService.register(req.body);
    if (user) {
      req.flash('message', 'Registration Successful! Please Log In.');
      res.redirect('/login');
      return res;
    }
  }
}
