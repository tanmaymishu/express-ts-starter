import User from '../database/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mailQueue } from '../queues/mail';
import SendWelcomeEmail from '../jobs/send-welcome-email';

export async function createUser(body: any) {
  let user = await User.query().insert({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10)
  });

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: generateJwt(user)
  };
}

export async function register(body: any) {
  const user = await createUser(body);

  mailQueue.add(SendWelcomeEmail.jobName, user);

  return user;
}

export async function login(body: any) {
  const user = await User.query().findOne('email', body.email);
  if (!user || !bcrypt.compareSync(body.password, user.password)) {
    throw new Error('User not found');
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: generateJwt(user)
  };
}

export function generateJwt(user: User) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret not set');
  }
  return jwt.sign(
    {
      sub: user.$id(),
      iat: Date.now(),
      iss: 'api.example.com',
      aud: 'app.example.com'
    },
    process.env.JWT_SECRET
  );
}