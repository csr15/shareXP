"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userStoriesController = void 0;
const search_service_1 = require("../services/search.service");
exports.userStoriesController = {
    followingStories: async (req, res, next) => {
        try {
            const result = await search_service_1.searchService.followingStories(req.params.uid);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    topStories: async (_req, res, next) => {
        try {
            const result = await search_service_1.searchService.topStories();
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    latestStories: async (_req, res, next) => {
        try {
            const result = await search_service_1.searchService.latestStories();
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    getAuthor: async (req, res, next) => {
        try {
            const result = await search_service_1.searchService.getAuthor(req.params.uid);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
};
