"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: parseInt(process.env.PORT || '8080', 10),
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/shareXP',
    jwtSecret: process.env.JWT_SECRET || 'change-me',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
    },
    smtp: {
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
        from: process.env.SMTP_FROM || '',
    },
};
