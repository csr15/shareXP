import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { storyApi } from '../../api/story.api';
import { searchApi } from '../../api/search.api';
import { Story, StoryContent } from '../../types/story.types';

interface StoryState {
  publishedStory: string;
  didStoryUpdated: boolean;
  errorOnPublishing: boolean;
  followingStories: Story[] | null;
  topStories: Story[] | null;
  latestStories: Story[] | null;
  suggestionStories: Story[] | null;
}

const initialState: StoryState = {
  publishedStory: '',
  didStoryUpdated: false,
  errorOnPublishing: false,
  followingStories: null,
  topStories: null,
  latestStories: null,
  suggestionStories: null,
};

export const publishStory = createAsyncThunk(
  'story/publish',
  async (storyData: { uid: string; userName: string; story: StoryContent }) => {
    const { data } = await storyApi.publish(storyData);
    return data;
  },
);

export const updateStory = createAsyncThunk(
  'story/update',
  async ({ storyId, story }: { storyId: string; story: StoryContent }) => {
    const { data } = await storyApi.update(storyId, story);
    return data;
  },
);

export const fetchFollowingStories = createAsyncThunk(
  'story/fetchFollowing',
  async () => {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('Not authenticated');
    const { data } = await searchApi.followingStories(uid);
    return data[0]?.docs ?? [];
  },
);

export const fetchTopStories = createAsyncThunk(
  'story/fetchTop',
  async () => {
    const { data } = await searchApi.topStories();
    return data;
  },
);

export const fetchLatestStories = createAsyncThunk(
  'story/fetchLatest',
  async () => {
    const { data } = await searchApi.latestStories();
    return data;
  },
);

export const fetchSuggestions = createAsyncThunk(
  'story/fetchSuggestions',
  async (tags: string[]) => {
    const { data } = await searchApi.suggestions(tags);
    return data;
  },
);

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    resetPublished: (state) => {
      state.publishedStory = '';
    },
    resetUpdateStory: (state) => {
      state.didStoryUpdated = false;
      state.errorOnPublishing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(publishStory.fulfilled, (state, action) => {
        state.publishedStory = action.payload;
      })
      .addCase(updateStory.fulfilled, (state) => {
        state.didStoryUpdated = true;
      })
      .addCase(updateStory.rejected, (state) => {
        state.errorOnPublishing = true;
      })
      .addCase(fetchFollowingStories.fulfilled, (state, action) => {
        state.followingStories = action.payload;
      })
      .addCase(fetchTopStories.fulfilled, (state, action) => {
        state.topStories = action.payload;
      })
      .addCase(fetchLatestStories.fulfilled, (state, action) => {
        state.latestStories = action.payload;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestionStories = action.payload;
      });
  },
});

export const { resetPublished, resetUpdateStory } = storySlice.actions;
export default storySlice.reducer;
