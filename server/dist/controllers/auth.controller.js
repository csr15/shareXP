"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
exports.authController = {
    checkUserName: async (req, res, next) => {
        try {
            const result = await auth_service_1.authService.checkUserName(req.params.userName);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    checkMail: async (req, res, next) => {
        try {
            const result = await auth_service_1.authService.checkMail(req.params.mail);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    signup: async (req, res, next) => {
        try {
            const result = await auth_service_1.authService.signup(req.body);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
    signin: async (req, res, next) => {
        try {
            const { token, userDetails } = await auth_service_1.authService.signin(req.body);
            res.cookie('token', token, { httpOnly: true }).json({ userDetails });
        }
        catch (err) {
            next(err);
        }
    },
    googleAuth: async (req, res, next) => {
        try {
            const { token, userDoc } = await auth_service_1.authService.googleAuth(req.body.tokenId);
            res.cookie('token', token, { httpOnly: true }).json({ userDoc });
        }
        catch (err) {
            next(err);
        }
    },
    checkAuth: async (_req, res, next) => {
        try {
            const token = auth_service_1.authService.checkAuth();
            res.cookie('token', token, { httpOnly: true }).send('New JWT generated');
        }
        catch (err) {
            next(err);
        }
    },
    deleteAccount: async (req, res, next) => {
        try {
            const result = await auth_service_1.authService.deleteAccount(req.params.uid);
            res.json(result);
        }
        catch (err) {
            next(err);
        }
    },
};
//# sourceMappingURL=auth.controller.js.map