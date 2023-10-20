import { Request, Response, NextFunction } from 'express';
import ApiError from '../../middlewares/error/ApiError';
import authService from './auth.service';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw ApiError.badRequest('Необходимо указать имя пользователя и пароль');

    res.json({ accessToken: await authService.login(username, password) });
  } catch (err) {
    next(err);
  }
};

export default {
  login,
};
