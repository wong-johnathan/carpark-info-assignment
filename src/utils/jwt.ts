import { config } from '../config';
import jwt from 'jsonwebtoken';

export const getToken = (payload: { id: number; email: string }) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwt.secret) as { id: number; email: string };
};
