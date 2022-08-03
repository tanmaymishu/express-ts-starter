import { Request, Response } from 'express';
import passport from 'passport';
import { Controller, Delete, Get, Post, Render, Req, Res, UseBefore } from 'routing-controllers';
import { Service } from 'typedi';
import auth from '@/middleware/auth.middleware';

@Controller()
@Service()
export class LoginController {
  @Get('/login')
  @UseBefore(auth.guest)
  @Render('login')
  create(@Req() req: Request, @Res() res: Response) {}

  @Post('/login')
  @UseBefore(auth.web)
  @UseBefore(
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/login',
      failureFlash: 'Invalid Username or Password.',
      successFlash: 'Login Successful.'
    })
  )
  store(@Req() req: Request, @Res() res: Response) {}

  @Delete('/logout')
  @UseBefore(auth.web)
  destroy(@Req() req: Request, @Res() res: Response) {
    req.logOut(() => {});
    res.redirect('/login');
    return res;
  }
}
