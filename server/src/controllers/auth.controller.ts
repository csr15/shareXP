import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';

export const authController = {
  checkUserName: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.checkUserName(req.params.userName);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  checkMail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.checkMail(req.params.mail);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.signup(req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  signin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, userDetails } = await authService.signin(req.body);
      res.cookie('token', token, { httpOnly: true }).json({ userDetails });
    } catch (err) {
      next(err);
    }
  },

  googleAuth: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token, userDoc } = await authService.googleAuth(req.body.tokenId);
      res.cookie('token', token, { httpOnly: true }).json({ userDoc });
    } catch (err) {
      next(err);
    }
  },

  checkAuth: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const token = authService.checkAuth();
      res.cookie('token', token, { httpOnly: true }).send('New JWT generated');
    } catch (err) {
      next(err);
    }
  },

  deleteAccount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.deleteAccount(req.params.uid);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
