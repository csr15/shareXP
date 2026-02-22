import nodemailer from 'nodemailer';
import { config } from '../config';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.port === 465,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass,
  },
});

export const mailService = {
  sendWelcomeEmail: async (to: string): Promise<void> => {
    if (!config.smtp.user) {
      logger.warn('SMTP not configured, skipping welcome email');
      return;
    }

    const mailOptions = {
      from: config.smtp.from,
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
    } catch (error) {
      logger.error({ err: error }, 'Failed to send welcome email');
    }
  },
};
