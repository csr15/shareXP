import apiClient from './client';

export const searchApi = {
  search: (query: string) =>
    apiClient.get('/search', { params: { search: query } }),

  topTags: () =>
    apiClient.get('/search/topTags'),

  tagStories: (tagName: string) =>
    apiClient.get(`/search/tagStories/${tagName}`),

  suggestions: (tags: string[]) =>
    apiClient.post('/suggestions', { tags }),

  followingStories: (uid: string) =>
    apiClient.get(`/userStories/stories/followingTagStories/${uid}`),

  topStories: () =>
    apiClient.get('/userStories/stories/topStories'),

  latestStories: () =>
    apiClient.get('/userStories/stories/latestStories'),
};
