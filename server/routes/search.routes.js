"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_controller_1 = require("../controllers/search.controller");
const router = (0, express_1.Router)();
router.get('/', search_controller_1.searchController.search);
router.get('/topTags', search_controller_1.searchController.topTags);
router.get('/tagStories/:tagName', search_controller_1.searchController.tagStories);
exports.default = router;
