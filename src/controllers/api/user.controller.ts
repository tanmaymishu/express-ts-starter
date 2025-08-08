import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from 'routing-controllers';
import { Service } from 'typedi';
import { User } from '@/database/sql/entities/user.entity';

@Service()
@Controller('/api/v1')
export class UserController {
  @Get('/users')
  async index(@Req() req: Request, @Res() res: Response) {
    // SECURITY CRITICAL: This endpoint exposes ALL user data including passwords!
    // TODO: Add proper data sanitization and pagination
    // TODO: Implement role-based access control
    // TODO: Return only safe fields (exclude password, sensitive data)
    const users = await User.find();
    return res.json(users);
  }
}
