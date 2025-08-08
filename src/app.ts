import dotenv from 'dotenv';

if (process.env.NODE_ENV == 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}
import 'reflect-metadata';
import { useContainer, useExpressServer } from 'routing-controllers';
import express, { NextFunction, Request, Response } from 'express';
import methodOverride from 'method-override';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import '@/util/helpers';
import multer from 'multer';
import morganLogger from '@/middleware/morgan.middleware';
import logger from '@/util/logger';

import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { mailQueue } from '@/queues/mail';
import path from 'path';

import IORedis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import Container from 'typedi';
import AppServiceProvider from '@/providers/app-service.provider';
import AuthServiceProvider from '@/providers/auth-service.provider';
import DatabaseServiceProvider from '@/providers/database-service.provider';

const providers = [AppServiceProvider, DatabaseServiceProvider, AuthServiceProvider];
providers.forEach((provider) => new provider().register());

const redisClient = new IORedis({
  port: parseInt(process.env.REDIS_PORT || '6379'),
  host: process.env.REDIS_HOST || 'localhost'
});
const RedisStore = connectRedis(session);

// Create an express app.
const app = express();

// Security headers with Helmet
app.use(helmet());

// Make req.cookies accessible
app.use(cookieParser());

//Configure session middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.JWT_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // if true prevent client side JS from reading the cookie
      secure: process.env.NODE_ENV === 'production', // if true only transmit cookie over https
      maxAge: 1000 * 60 * 60 * 24 // session max age in miliseconds
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// Global Middlewares
app.use(
  // Add custom helpers to request object
  (req, res, next) => {
    req.wantsJson = () => {
      return req.accepts()[0].includes('/json') || req.accepts()[0].includes('+json');
    };
    next();
  },
  // Save flash variables to the session
  // for a single request.
  (req, res, next) => {
    // User defined message
    res.locals.message = req.flash('message');
    // Validation errors thrown from validate middleware
    res.locals.validationErrors = req.flash('validationErrors');
    // Generic error and success
    res.locals.errorBag = req.flash('error');
    res.locals.successBag = req.flash('success');
    next();
  }
);

// Allow PUT, DELETE, PATCH etc. from browser
app.use(methodOverride('_method'));
// Parse the application/json request body.
app.use(express.json());
// Parse the x-www-form-urlencoded request body.
app.use(express.urlencoded({ extended: true }));
// Parse the form-data request body.
app.use(multer().any());
// Enable CORS
app.use(cors());
// Log the incoming requests to console.
app.use(morganLogger);

// Home route moved to HomeController

// Add rate limiting for API endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Authentication rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs for auth endpoints
  message: 'Too many authentication attempts, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/v1/login', authLimiter);
app.use('/api/v1/register', authLimiter);

// Set up queue monitoring route with BullBoard v6
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

createBullBoard({
  queues: [new BullMQAdapter(mailQueue)],
  serverAdapter: serverAdapter
});

app.use('/admin/queues', serverAdapter.getRouter());

// Add views
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
useContainer(Container);

useExpressServer(app, {
  controllers: [path.join(__dirname, '/controllers/**/*.controller.*')],
  defaultErrorHandler: false,
  middlewares: [
    path.join(__dirname, '/middleware/global/*.middleware.*')
  ]
});

// Global error handling middleware
app.use(function (error: Error, req: Request, res: Response, next: NextFunction) {
  if (error) {
    // Log error details securely using Winston
    logger.error(`${req.method} ${req.path} - ${error.name}: ${error.message}`, {
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    // Return error message based on APP_DEBUG setting
    const isDebugMode = process.env.APP_DEBUG === 'true';
    const errorResponse = {
      error: isDebugMode ? error.message : 'Server Error',
      ...(isDebugMode && { stack: error.stack })
    };

    return res.status(500).json(errorResponse);
  }
  return next();
});

// Catch 404.
app.use(function (req: Request, res: Response) {
  if (!res.headersSent) {
    return res.status(404).json({ message: 'Page Not Found!' });
  }
});

export default app;
export { redisClient };
