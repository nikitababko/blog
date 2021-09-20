import dotenv from 'dotenv';
dotenv.config({ path: 'src/config/keys.env' });

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import routes from './routes/index';

// Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

// Routes
app.use('/api', routes.authRouter);
app.use('/api', routes.userRouter);
app.use('/api', routes.categoryRouter);

// Database
import './core/database';

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
