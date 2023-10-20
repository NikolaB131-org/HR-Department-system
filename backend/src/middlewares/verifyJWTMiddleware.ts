import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import ApiError from './error/ApiError';

const verifyJWTMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw ApiError.unauthorized('Unauthorized');

  const accessToken = authHeader.split(' ')[1];
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET ?? '';

  jwt.verify(accessToken, accessTokenSecret, (err, decoded) => {
    if (err || !decoded || typeof decoded === 'string' || !('userId' in decoded)) throw ApiError.forbidden('Forbidden');

    req.headers['user-id'] = decoded.userId;
    next();
  });
};

export default verifyJWTMiddleware;
