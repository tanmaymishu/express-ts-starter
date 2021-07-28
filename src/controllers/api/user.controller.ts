import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from 'routing-controllers';
import User from '../../database/models/user';

@Controller('/api/v1')
export class UserController {
  @Get('/users')
  async index(@Req() req: Request, @Res() res: Response) {
    const users = await User.query().paginate(
      req.query.page as NumericQueryString,
      15
    );
    return res.json(users);
  }
}