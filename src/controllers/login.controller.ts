import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

const rules = [body('email').exists(), body('password').exists()];

function create(req: Request, res: Response) {
  res.render('login');
}

export { rules, create };
