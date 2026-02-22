"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyController = void 0;
const story_service_1 = require("../services/story.service");
exports.storyController = {
    publish: async (req, res, next) => {
        try {
            const result = await story_service_1.storyService.publish(req.body);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const result = await story_service_1.storyService.update(req.params.storyId, req.body.story);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    addComment: async (req, res, next) => {
        try {
            const result = await story_service_1.storyService.addComment(req.params.storyId, req.body);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    getById: async (req, res, next) => {
        try {
            const result = await story_service_1.storyService.getById(req.params.storyId);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=story.controller.js.map