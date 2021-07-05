import { Request, Response } from 'express';

function pong(req: Request, res: Response) {
  res.json({ message: 'pong' });
}

export { pong };
