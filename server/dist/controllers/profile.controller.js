"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileController = void 0;
const profile_service_1 = require("../services/profile.service");
exports.profileController = {
    getProfile: async (req, res, next) => {
        try {
            const result = await profile_service_1.profileService.getProfile(req.params.uid);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    deleteStory: async (req, res, next) => {
        try {
            const result = await profile_service_1.profileService.deleteStory(req.params.storyId);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    updateProfile: async (req, res, next) => {
        try {
            const result = await profile_service_1.profileService.updateProfile(req.params.uid, req.body);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    likeStory: async (req, res, next) => {
        try {
            const result = await profile_service_1.profileService.likeStory(req.body);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    unlikeStory: async (req, res, next) => {
        try {
            const result = await profile_service_1.profileService.unlikeStory(req.params.storyId, req.params.uid, req.params.authorId);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    updateView: async (req, res, next) => {
        try {
            await profile_service_1.profileService.updateView(req.params.storyId);
            res.json({ message: 'View updated' });
        }
        catch (err) {
            next(err);
        }
    },
    followTag: async (req, res, next) => {
        try {
            await profile_service_1.profileService.followTag(req.params.uid, req.body.tagName);
            res.json({ message: 'Following' });
        }
        catch (err) {
            next(err);
        }
    },
    unFollowTag: async (req, res, next) => {
        try {
            await profile_service_1.profileService.unFollowTag(req.params.uid, req.body.tagName);
            res.json(req.body.tagName);
        }
        catch (err) {
            next(err);
        }
    },
    deleteAvatar: async (req, res, next) => {
        try {
            await profile_service_1.profileService.deleteAvatar(req.params.uid);
            res.json('Avatar deleted');
        }
        catch (err) {
            next(err);
        }
    },
    getNotifications: async (req, res, next) => {
        try {
            const result = await profile_service_1.profileService.getNotifications(req.params.uid);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    clearNotification: async (req, res, next) => {
        try {
            const result = await profile_service_1.profileService.clearNotification(req.params.storyId, req.params.uid);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=profile.controller.js.map