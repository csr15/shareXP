"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const database_1 = require("./config/database");
const logger_1 = require("./utils/logger");
const start = async () => {
    await (0, database_1.connectDatabase)();
    app_1.default.listen(config_1.config.port, () => {
        logger_1.logger.info(`Server running on port ${config_1.config.port}`);
    });
};
start().catch((err) => {
    logger_1.logger.error({ err }, 'Failed to start server');
    process.exit(1);
});
//# sourceMappingURL=server.js.map