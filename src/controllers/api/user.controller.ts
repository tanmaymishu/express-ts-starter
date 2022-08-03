import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from 'routing-controllers';
import { User } from '@/database/sql/entities/user.entity';

@Controller('/api/v1')
export class UserController {
  @Get('/users')
  async index(@Req() req: Request, @Res() res: Response) {
    const users = await User.find();
    return res.json(users);
  }
}
