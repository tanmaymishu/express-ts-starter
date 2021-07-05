import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export default function validate(rules: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let i = 0; i < rules.length; i++) {
      await rules[i].run(req);
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  };
}
