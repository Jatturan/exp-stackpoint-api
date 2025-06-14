import express from 'express';
import morgan from 'morgan';
import userRoutes from './routes/user.routes.js';
import errorHandler from './middlewares/error.middleware.js';
import { NODE_ENV } from './config/index.js';

const app = express();

// Global middlewares
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// Routes middlewares
app.use('/api/auth/v1/users', userRoutes);

// Custom middleware
app.use(errorHandler);

export default app;
