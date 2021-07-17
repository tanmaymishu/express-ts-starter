import { Request, Response } from 'express';

function pong(req: Request, res: Response) {
  if (req.wantsJson()) {
    return res.json({ message: 'pong' });
  } else {
    res.render('pong');
  }
}

export default { pong };
