import { Request, Response } from 'express';
import { body } from 'express-validator';
import { Controller, Post, Req, Res, UseBefore } from 'routing-controllers';
import User from '../../database/sql/models/user';
import validate from '../../middleware/validation.middleware';
import AuthService from '../../services/auth.service';

@Controller('/api/v1')
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

  @Post('/register')
  @UseBefore(validate(RegisterController.rules))
  async store(@Req() req: Request, @Res() res: Response) {
    let user = await this.authService.register(req.body);

    return res.status(201).json({ user });
  }
}
