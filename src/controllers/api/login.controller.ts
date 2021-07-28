import { Request, Response } from 'express';
import { body } from 'express-validator';
import { Controller, Post, Req, Res, UseBefore } from 'routing-controllers';
import validate from '../../middleware/validation.middleware';
import * as AuthService from '../../services/auth.service';

@Controller('/api/v1')
export class LoginController {
  static rules = [body('email').exists(), body('password').exists()];

  @Post('/login')
  @UseBefore(validate(LoginController.rules))
  async store(@Req() req: Request, @Res() res: Response) {
    return AuthService.login(req.body)
      .then((user) => {
        res.cookie('jwt', user.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production' // Should be true on production
        });
        return res.json({ user });
      })
      .catch((err) => {
        return res.status(422).json({ message: 'Invalid username or password' });
      });
  }
}
