import { Request, Response } from 'express';

function index(req: Request, res: Response) {
  res.locals.user = req.user;
  res.render('dashboard');
}

export default { index };
