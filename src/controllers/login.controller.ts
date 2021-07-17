import { Request, Response } from 'express';
import { body } from 'express-validator';

const rules = [body('email').exists(), body('password').exists()];

function create(req: Request, res: Response) {
  res.render('login');
}

function destroy(req: Request, res: Response) {
  req.logOut();
  res.redirect('/login');
}

export default {
  rules,
  create,
  destroy
};
