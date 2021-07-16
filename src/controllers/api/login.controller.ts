import { Request, Response } from 'express';
import { body } from 'express-validator';
import * as AuthService from '../../services/auth.service';

const rules = [body('email').exists(), body('password').exists()];

function store(req: Request, res: Response) {
  AuthService.login(req.body)
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.status(422).json({ message: 'Invalid username or password' });
    });
}

export { rules, store };
