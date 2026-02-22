"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("./index");
const logger_1 = require("../utils/logger");
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(index_1.config.mongoUri);
        logger_1.logger.info('MongoDB connected');
    }
    catch (error) {
        logger_1.logger.error({ err: error }, 'MongoDB connection error');
        process.exit(1);
    }
};
exports.connectDatabase = connectDatabase;
//# sourceMappingURL=database.js.map