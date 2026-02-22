import { Document, Types } from 'mongoose';

export interface INotification {
  _id?: Types.ObjectId;
  uid: string;
  userName: string;
  authorId: string;
  content: string;
  createdAt: Date;
  storyId: string;
  storyTitle: string;
}

export interface IUser {
  userName: string;
  sureName: string;
  mail: string;
  password: string;
  following: string[];
  workingStatus: string;
  facebook: string;
  linkedIn: string;
  link: string;
  description: string;
  avatar: string;
  notifications: INotification[];
}

export interface IUserDocument extends IUser, Document {}

export interface UpdateProfileDto {
  description: string;
  socialLinks: {
    facebook: string;
    linkedIn: string;
    link: string;
  };
  workingStatus: string;
  avatar: string;
}

export interface SignupDto {
  data: {
    userName: string;
    sureName: string;
    mail: string;
    password: string;
  };
}

export interface SigninDto {
  data: {
    mail: string;
    password: string;
  };
}
