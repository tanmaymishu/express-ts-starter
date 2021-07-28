import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from 'routing-controllers';

@Controller()
export class PingController {
  @Get('/api/v1/ping')
  pong(@Req() req: Request, @Res() res: Response) {
    if (req.wantsJson()) {
      return res.json({ message: 'pong' });
    } else {
      res.render('pong');
      return res;
    }
  }
}