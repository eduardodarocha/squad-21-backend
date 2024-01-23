import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/container';
import avatarUpload from '@config/avatarUpload';

import AppError from '../../errors/AppError';

import routes from './routes';
import '../typeorm';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/avatar', express.static(`${avatarUpload.uploadsFolder}`));

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
