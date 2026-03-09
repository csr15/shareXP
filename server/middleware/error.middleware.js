"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errors_1 = require("../utils/errors");
const logger_1 = require("../utils/logger");
const errorMiddleware = (err, _req, res, _next) => {
    if (err instanceof errors_1.AppError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }
    logger_1.logger.error({ err }, 'Unhandled error');
    res.status(500).json({ message: 'Internal server error' });
};
exports.errorMiddleware = errorMiddleware;
