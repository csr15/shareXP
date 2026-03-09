"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchController = void 0;
const search_service_1 = require("../services/search.service");
exports.searchController = {
    search: async (req, res, next) => {
        try {
            const result = await search_service_1.searchService.search(req.query.search);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    topTags: async (_req, res, next) => {
        try {
            const result = await search_service_1.searchService.topTags();
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    tagStories: async (req, res, next) => {
        try {
            const result = await search_service_1.searchService.tagStories(req.params.tagName);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    suggestions: async (req, res, next) => {
        try {
            const result = await search_service_1.searchService.suggestions(req.body.tags);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
};
