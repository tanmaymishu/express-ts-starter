import { Request, Response } from 'express';
import User from '../../database/models/user';

async function index(req: Request, res: Response) {
  const users = await User.query().paginate(
    req.query.page as NumericQueryString,
    15
  );
  res.json(users);
}

export default { index };
