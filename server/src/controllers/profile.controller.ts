import { Request, Response, NextFunction } from 'express';
import { profileService } from '../services/profile.service';

export const profileController = {
  getProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await profileService.getProfile(req.params.uid);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  deleteStory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await profileService.deleteStory(req.params.storyId);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  updateProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await profileService.updateProfile(req.params.uid, req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  likeStory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await profileService.likeStory(req.body);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  unlikeStory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await profileService.unlikeStory(
        req.params.storyId,
        req.params.uid,
        req.params.authorId,
      );
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  updateView: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await profileService.updateView(req.params.storyId);
      res.json({ message: 'View updated' });
    } catch (err) {
      next(err);
    }
  },

  followTag: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await profileService.followTag(req.params.uid, req.body.tagName);
      res.json({ message: 'Following' });
    } catch (err) {
      next(err);
    }
  },

  unFollowTag: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await profileService.unFollowTag(req.params.uid, req.body.tagName);
      res.json(req.body.tagName);
    } catch (err) {
      next(err);
    }
  },

  deleteAvatar: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await profileService.deleteAvatar(req.params.uid);
      res.json('Avatar deleted');
    } catch (err) {
      next(err);
    }
  },

  getNotifications: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await profileService.getNotifications(req.params.uid);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },

  clearNotification: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await profileService.clearNotification(req.params.storyId, req.params.uid);
      res.json(result);
    } catch (err) {
      next(err);
    }
  },
};
