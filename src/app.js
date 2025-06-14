import express from 'express';
import userRoutes from './routes/user.routes.js';

const app = express();

// Global middlewares
app.use(express.json());

// Routes middlewares
app.use('/api/auth/v1/users', userRoutes);

export default app;
