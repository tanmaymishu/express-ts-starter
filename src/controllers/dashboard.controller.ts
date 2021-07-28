import csurf from 'csurf';
import { Request, Response } from 'express';
import { Controller, Get, Render, Req, Res, UseBefore } from 'routing-controllers';
import auth from '../middleware/auth.middleware';

@Controller()
@UseBefore(csurf())
export class DashboardController {
  @Get('/dashboard')
  @UseBefore(auth.web)
  @Render('dashboard')
  index(@Req() req: Request, @Res() res: Response) {
    res.locals.user = req.user;
    // Alternative to @Render. Always must return a response object.
    // res.render('dashboard');
    // return res;
  }
}
