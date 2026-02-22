import apiClient from './client';
import { StoryContent, Comment } from '../types/story.types';

export const storyApi = {
  publish: (data: { uid: string; userName: string; story: StoryContent }) =>
    apiClient.post(`/publish/${data.uid}`, data),

  update: (storyId: string, story: StoryContent) =>
    apiClient.patch(`/publish/updateStory/${storyId}`, { story }),

  addComment: (storyId: string, comment: Comment, notification: Record<string, string>) =>
    apiClient.post(`/publish/comment/${storyId}`, { comment, notification }),

  getById: (storyId: string) =>
    apiClient.get(`/storyData/${storyId}`),

  getAuthor: (uid: string) =>
    apiClient.get(`/author/${uid}`),
};
