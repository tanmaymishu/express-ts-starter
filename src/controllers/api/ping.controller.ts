import { Request, Response } from 'express';

function pong(req: Request, res: Response) {
  if (req.accepts('text/plain')) {
    res.render('pong');
  } else {
    res.json({ message: 'pong' });
  }
}

export { pong };
