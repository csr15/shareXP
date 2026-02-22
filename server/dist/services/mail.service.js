"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const logger_1 = require("../utils/logger");
const transporter = nodemailer_1.default.createTransport({
    host: config_1.config.smtp.host,
    port: config_1.config.smtp.port,
    secure: config_1.config.smtp.port === 465,
    auth: {
        user: config_1.config.smtp.user,
        pass: config_1.config.smtp.pass,
    },
});
exports.mailService = {
    sendWelcomeEmail: async (to) => {
        if (!config_1.config.smtp.user) {
            logger_1.logger.warn('SMTP not configured, skipping welcome email');
            return;
        }
        const mailOptions = {
            from: config_1.config.smtp.from,
            to,
            subject: 'Account created successfully',
            html: `
        <h1 style="color: #8e27f6; text-align: center; font-weight: 700; font-size: 32px;">
          <span style="font-size: 16px; color: #000;">welcome to</span><br/>shareXP
        </h1>
        <h5 style="font-style: italic; text-align: center; font-size: 16px;">
          Account created successfully!
        </h5>
        <p style="color: #000; font-size: 14px; text-align: center;">
          Share your experience with others and motivate them towards success!
        </p>
      `,
        };
        try {
            await transporter.sendMail(mailOptions);
        }
        catch (error) {
            logger_1.logger.error({ err: error }, 'Failed to send welcome email');
        }
    },
};
//# sourceMappingURL=mail.service.js.map