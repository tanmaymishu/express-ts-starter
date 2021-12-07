import User from '../database/sql/models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { mailQueue } from '../queues/mail';
import SendWelcomeEmail from '../jobs/send-welcome-email';
import { Request } from 'express';
import { Inject, Service } from 'typedi';
import Repository from '../repositories/repository';
import Authenticatable from '../database/authenticatable';
@Service()
export default class AuthService {
  constructor(@Inject('user.repository') public userRepository: Repository<User>) { }

  async createUser(body: any) {
    let user = await this.userRepository.save(body);

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: this.generateJwt(user)
    };
  }

  async register(req: Request) {
    const user = await this.createUser(req.body);

    mailQueue.add(SendWelcomeEmail.jobName, user);

    return user;
  }

  async login(req: Request) {
    const user = await this.userRepository.findOne({ email: req.body.email });

    // const user = await User.query().findOne('email', body.email);
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

  generateJwt(user: Authenticatable) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT secret not set');
    }
    return jwt.sign(
      {
        sub: user.getId(),
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
