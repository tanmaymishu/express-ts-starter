import dotenv from 'dotenv';

if (process.env.NODE_ENV == 'testing') {
  dotenv.config({ path: '.env.testing' });
} else {
  dotenv.config();
}

import express, { NextFunction, Request, Response } from 'express';
import methodOverride from 'method-override';
import csrf from 'csurf';
import './util/passport';
import './util/helpers';
import multer from 'multer';
import logger from './util/logger';
import morganLogger from './middleware/morgan.middleware';
import apiRoutes from './routes/api';
import webRoutes from './routes/web';

import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { mailQueue } from './queues/mail';
import path from 'path';

import IORedis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';

const redisClient = new IORedis(
  parseInt(<string>process.env.REDIS_PORT),
  process.env.REDIS_HOST
);
const RedisStore = connectRedis(session);

// Create an express app.
const app = express();

//Configure session middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.JWT_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
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
      return (
        req.accepts()[0].includes('/json') || req.accepts()[0].includes('+json')
      );
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

// Log the incoming requests to console.
app.use(morganLogger);

// Example route.
app.get('/', (req, res, next) => {
  res.json({ message: 'Home, Sweet Home.' });
});

// Register and mount the routes.
// Register API routes. They don't require CSRF protection.
app.use('/', apiRoutes);

// Register Web routes. They do require CSRF protection.
app.use(
  '/',
  csrf(),
  (req, res, next) => {
    res.locals._token = req.csrfToken();
    next();
  },
  webRoutes
);

// Set up queue monitoring route.
const serverAdapter = new ExpressAdapter();

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(mailQueue)],
  serverAdapter: serverAdapter
});

serverAdapter.setBasePath('/admin/queues');
app.use('/admin/queues', serverAdapter.getRouter());

// Add views
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));

// Catch any error and send it as a json.
app.use(function (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error) {
    logger.error(error.message);
    return res.status(500).json({ error: error.message });
  }
});

// Catch 404.
app.use(function (req: Request, res: Response) {
  return res.status(404).json({ message: 'Page Not Found!' });
});

export default app;
