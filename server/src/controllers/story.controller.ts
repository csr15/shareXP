import { Request, Response, NextFunction } from 'express';
import { storyService } from '../services/story.service';

export const storyController = {
  publish: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await storyService.publish(req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await storyService.update(req.params.storyId, req.body.story);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  addComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await storyService.addComment(req.params.storyId, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await storyService.getById(req.params.storyId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
