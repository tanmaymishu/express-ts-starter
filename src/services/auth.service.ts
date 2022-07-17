import { User } from '../database/sql/entities/user.entity';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mailQueue } from '../queues/mail';
import SendWelcomeEmail from '../jobs/send-welcome-email';
import { Request } from 'express';
import { Service } from 'typedi';
import { AppDataSource } from '../database/sql/data-source';
@Service()
export default class AuthService {
  async createUser(body: any) {
    let userRepo = AppDataSource.getRepository(User);
    let user = new User();
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.email = body.email;
    user.password = bcrypt.hashSync(body.password, 10);
    userRepo.insert(user);
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: this.generateJwt(user)
    };
  }

  async register(req: Request) {
    const user = await this.createUser(req.body);

    // mailQueue.add(SendWelcomeEmail.jobName, user);

    return user;
  }

  async login(req: Request) {
    const user = await User.findOneBy({ email: req.body.email });

    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
      throw new Error('User not found');
    }

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: this.generateJwt(user)
    };
  }

  generateJwt(user: User) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret not set');
    }
    return jwt.sign(
      {
        sub: user.id,
        iat: Date.now(),
        iss: 'api.example.com',
        aud: 'app.example.com'
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 604800
      }
    );
  }
}
