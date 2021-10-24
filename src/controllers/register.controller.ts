import { Request, Response } from 'express';
import { body } from 'express-validator';
import { Controller, Get, Post, Req, Res, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import User from '../database/sql/models/user';
import auth from '../middleware/auth.middleware';
import validate from '../middleware/validation.middleware';
import AuthService from '../services/auth.service';

@Controller()
@Service()
export class RegisterController {
  constructor(public authService: AuthService) { }
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
    console.log(this.authService);
    res.render('register');
    return res;
  }

  @Post('/register')
  @UseBefore(auth.guest)
  @UseBefore(validate(RegisterController.rules))
  async store(@Req() req: Request, @Res() res: Response) {
    let user = await this.authService.register(req);
    if (user) {
      req.flash('message', 'Registration Successful! Please Log In.');
      res.redirect('/login');
      return res;
    }
  }
}
