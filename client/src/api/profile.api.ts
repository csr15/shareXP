import apiClient from './client';

export const profileApi = {
  getProfile: (uid: string) =>
    apiClient.get(`/profile/${uid}`),

  deleteStory: (storyId: string) =>
    apiClient.delete(`/profile/deleteStory/${storyId}`),

  updateView: (storyId: string) =>
    apiClient.get(`/profile/updateView/${storyId}`),

  updateProfile: (uid: string, data: Record<string, unknown>) =>
    apiClient.post(`/profile/updateProfile/${uid}`, data),

  followTag: (uid: string, tagName: string) =>
    apiClient.post(`/profile/followTag/${uid}`, { tagName }),

  unFollowTag: (uid: string, tagName: string) =>
    apiClient.post(`/profile/unFollowTag/${uid}`, { tagName }),

  likeStory: (data: Record<string, string>) =>
    apiClient.post('/profile/likeStory', data),

  unlikeStory: (storyId: string, uid: string, authorId: string) =>
    apiClient.post(`/profile/unLikeStory/${storyId}/${uid}/${authorId}`),

  deleteAvatar: (uid: string) =>
    apiClient.delete(`/profile/deleteAvatar/${uid}`),

  getNotifications: (uid: string) =>
    apiClient.get(`/profile/notifications/${uid}`),

  clearNotification: (notificationId: string, uid: string) =>
    apiClient.patch(`/profile/clearNotification/${notificationId}/${uid}`),
};
