import { Request, Response, NextFunction } from 'express';
import { searchService } from '../services/search.service';

export const userStoriesController = {
  followingStories: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await searchService.followingStories(req.params.uid);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  topStories: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await searchService.topStories();
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  latestStories: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await searchService.latestStories();
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  getAuthor: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await searchService.getAuthor(req.params.uid);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
