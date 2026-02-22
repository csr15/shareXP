import { Document, Types } from 'mongoose';

export interface IComment {
  _id?: Types.ObjectId;
  userName: string;
  uid: string;
  comment: string;
  commentedAt: Date;
  avatar: string;
}

export interface IStoryContent {
  title: string;
  content: string;
  tags: string[];
  img: string;
}

export interface IStory {
  uid: string;
  userName: string;
  createdAt: Date;
  likes: string[];
  views: number;
  story: IStoryContent;
  comments: IComment[];
}

export interface IStoryDocument extends IStory, Document {}

export interface PublishStoryDto {
  uid: string;
  userName: string;
  story: IStoryContent;
}

export interface CommentDto {
  comment: IComment;
  notification: {
    storyId: string;
    uid: string;
    authorId: string;
    userName: string;
    storyTitle: string;
  };
}

export interface LikeStoryDto {
  storyId: string;
  uid: string;
  authorId: string;
  userName: string;
  storyTitle: string;
}
