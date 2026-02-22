import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UnauthorizedError } from '../utils/errors';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token;
  if (!token) {
    throw new UnauthorizedError('Authentication required');
  }

  try {
    jwt.verify(token, config.jwtSecret);
    next();
  } catch {
    res.clearCookie('token');
    throw new UnauthorizedError('Invalid or expired token');
  }
};
