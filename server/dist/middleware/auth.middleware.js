"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const errors_1 = require("../utils/errors");
const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        throw new errors_1.UnauthorizedError('Authentication required');
    }
    try {
        jsonwebtoken_1.default.verify(token, config_1.config.jwtSecret);
        next();
    }
    catch {
        res.clearCookie('token');
        throw new errors_1.UnauthorizedError('Invalid or expired token');
    }
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map