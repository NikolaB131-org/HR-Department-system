import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import ApiError from '../../middlewares/error/ApiError';
import User from './../user/user.model';

const PASSWORD_HASH_LENGTH = 64;

const hashPassword = (password: string): string => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, PASSWORD_HASH_LENGTH).toString('hex');
  return salt + ':' + hash;
};

const verifyPassword = (password: string, saltWithHash: string): boolean => {
  const [salt, hash] = saltWithHash.split(':');
  const oldHashBuffer = Buffer.from(hash, 'hex');
  const newHashBuffer = crypto.scryptSync(password, salt, PASSWORD_HASH_LENGTH);
  return crypto.timingSafeEqual(oldHashBuffer, newHashBuffer);
};

const generateAccessToken = (userId: string): string => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) throw ApiError.internal('Не удалось сгенерировать токен');

  return jwt.sign({ userId }, accessTokenSecret);
};

const register = async (username: string, password: string): Promise<string | void> => {
  if (username.length < 3) throw ApiError.badRequest('Имя пользователя должно содержать не менее 3 символов');

  const saltWithHash = hashPassword(password);
  const user = await User.create({ username, saltWithHash });

  console.log(`Зарегестрирован новый пользователь: ${username}`);
  return generateAccessToken(user.id);
};

const login = async (username: string, password: string): Promise<string | void> => {
  const user = await User.findOne({ username });
  if (user) {
    if (verifyPassword(password, user.saltWithHash)) {
      console.log(`Пользователь авторизовался: ${username}`);
      return generateAccessToken(user.id);
    }
    throw ApiError.badRequest('Указаны неверные имя пользователя или пароль');
  }
  return await register(username, password);
};

export default {
  login,
};
