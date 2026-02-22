import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { config } from '../config';
import { userRepository } from '../repositories/user.repository';
import { storyRepository } from '../repositories/story.repository';
import { mailService } from './mail.service';
import { NotFoundError, ValidationError } from '../utils/errors';
import { SignupDto, SigninDto } from '../types/user.types';

const googleClient = new OAuth2Client(config.google.clientId);

const generateToken = (): string => {
  return jwt.sign({}, config.jwtSecret, { expiresIn: '30d' });
};

export const authService = {
  checkUserName: async (userName: string) => {
    return userRepository.findByUserName(userName);
  },

  checkMail: async (mail: string) => {
    return userRepository.findByMail(mail);
  },

  signup: async (dto: SignupDto) => {
    const { userName, sureName, mail, password } = dto.data;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await userRepository.create({
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

    mailService.sendWelcomeEmail(mail).catch(() => {});

    return user;
  },

  signin: async (dto: SigninDto) => {
    const { mail, password } = dto.data;
    const user = await userRepository.findOnByMail(mail);
    if (!user) {
      throw new NotFoundError('Mail id wrong');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ValidationError('Mail id or password wrong');
    }

    const token = generateToken();
    return { token, userDetails: { uid: user._id } };
  },

  googleAuth: async (tokenId: string) => {
    const ticket = await googleClient.verifyIdToken({
      idToken: tokenId,
      audience: config.google.clientId,
    });

    const payload = ticket.getPayload();
    if (!payload?.email_verified) {
      throw new ValidationError('Google email not verified');
    }

    const { email, name, given_name, family_name, picture } = payload;

    const users = await userRepository.findByMail(email!);

    if (users.length > 0) {
      const token = generateToken();
      return { token, userDoc: users };
    }

    const newUser = await userRepository.create({
      userName: (name || '').replace(/ /g, ''),
      sureName: `${given_name || ''} ${family_name || ''}`.trim(),
      mail: email!,
      password: await bcrypt.hash(crypto.randomUUID(), 10),
      description: '',
      link: '',
      facebook: '',
      linkedIn: '',
      workingStatus: '',
      avatar: picture || '',
    });

    mailService.sendWelcomeEmail(email!).catch(() => {});

    const token = generateToken();
    return { token, userDoc: [newUser] };
  },

  checkAuth: () => {
    return generateToken();
  },

  deleteAccount: async (uid: string) => {
    const result = await Promise.all([
      userRepository.deleteById(uid),
      storyRepository.deleteByUserId(uid),
    ]);
    return result;
  },
};
