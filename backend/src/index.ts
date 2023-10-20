import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import ApiError from './middlewares/error/ApiError';
import errorMiddleware from './middlewares/error/errorMiddleware';
import verifyJWTMiddleware from './middlewares/verifyJWTMiddleware';
import mongoose from 'mongoose';
import authRouter from './routes/auth';

switch (process.env.NODE_ENV) {
  case 'development': {
    dotenv.config({ path: `.env.development` });
  }
  case 'production': {
    dotenv.config({ path: __dirname + `/.env.production` });
  }
}

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(helmet());
app.use(express.json());

app.use('/auth', authRouter);

app.use(verifyJWTMiddleware);

// Handle wrong route
app.use((req: Request, res: Response, next: NextFunction) => {
  next(ApiError.notFound('Not found'));
  return;
});

app.use(errorMiddleware);

(async () => {
  console.log('Подключение базы данных...');
  try {
    await mongoose.connect(`mongodb://${process.env.MONGO_DB_URL}/${process.env.MONGO_DB_NAME}`);
    console.log('База данных подключена');

    app.listen(PORT, () => console.log(`Сервер запустился на порту ${PORT}`));
  } catch (error) {
    console.log(`Ошибка при заупске сервера: ${error}`);
  }
})();
