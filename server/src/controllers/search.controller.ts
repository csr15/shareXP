import { Request, Response, NextFunction } from 'express';
import { searchService } from '../services/search.service';

export const searchController = {
  search: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await searchService.search(req.query.search as string);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  topTags: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await searchService.topTags();
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  tagStories: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await searchService.tagStories(req.params.tagName);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  suggestions: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await searchService.suggestions(req.body.tags);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
