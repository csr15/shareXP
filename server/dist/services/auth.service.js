"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const config_1 = require("../config");
const user_repository_1 = require("../repositories/user.repository");
const story_repository_1 = require("../repositories/story.repository");
const mail_service_1 = require("./mail.service");
const errors_1 = require("../utils/errors");
const googleClient = new google_auth_library_1.OAuth2Client(config_1.config.google.clientId);
const generateToken = () => {
    return jsonwebtoken_1.default.sign({}, config_1.config.jwtSecret, { expiresIn: '30d' });
};
exports.authService = {
    checkUserName: async (userName) => {
        return user_repository_1.userRepository.findByUserName(userName);
    },
    checkMail: async (mail) => {
        return user_repository_1.userRepository.findByMail(mail);
    },
    signup: async (dto) => {
        const { userName, sureName, mail, password } = dto.data;
        const salt = await bcryptjs_1.default.genSalt(10);
        const hash = await bcryptjs_1.default.hash(password, salt);
        const user = await user_repository_1.userRepository.create({
            userName,
            sureName,
            mail,
            password: hash,
            description: '',
            link: '',
            facebook: '',
            linkedIn: '',
            workingStatus: '',
        });
        mail_service_1.mailService.sendWelcomeEmail(mail).catch(() => { });
        return user;
    },
    signin: async (dto) => {
        const { mail, password } = dto.data;
        const user = await user_repository_1.userRepository.findOnByMail(mail);
        if (!user) {
            throw new errors_1.NotFoundError('Mail id wrong');
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            throw new errors_1.ValidationError('Mail id or password wrong');
        }
        const token = generateToken();
        return { token, userDetails: { uid: user._id } };
    },
    googleAuth: async (tokenId) => {
        const ticket = await googleClient.verifyIdToken({
            idToken: tokenId,
            audience: config_1.config.google.clientId,
        });
        const payload = ticket.getPayload();
        if (!payload?.email_verified) {
            throw new errors_1.ValidationError('Google email not verified');
        }
        const { email, name, given_name, family_name, picture } = payload;
        const users = await user_repository_1.userRepository.findByMail(email);
        if (users.length > 0) {
            const token = generateToken();
            return { token, userDoc: users };
        }
        const newUser = await user_repository_1.userRepository.create({
            userName: (name || '').replace(/ /g, ''),
            sureName: `${given_name || ''} ${family_name || ''}`.trim(),
            mail: email,
            password: await bcryptjs_1.default.hash(crypto_1.default.randomUUID(), 10),
            description: '',
            link: '',
            facebook: '',
            linkedIn: '',
            workingStatus: '',
            avatar: picture || '',
        });
        mail_service_1.mailService.sendWelcomeEmail(email).catch(() => { });
        const token = generateToken();
        return { token, userDoc: [newUser] };
    },
    checkAuth: () => {
        return generateToken();
    },
    deleteAccount: async (uid) => {
        const result = await Promise.all([
            user_repository_1.userRepository.deleteById(uid),
            story_repository_1.storyRepository.deleteByUserId(uid),
        ]);
        return result;
    },
};
//# sourceMappingURL=auth.service.js.map