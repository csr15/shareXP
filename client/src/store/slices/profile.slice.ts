import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { profileApi } from '../../api/profile.api';
import { Story } from '../../types/story.types';
import { UserDetails, Notification } from '../../types/auth.types';

interface ProfileState {
  myStories: Story[] | null;
  userDetails: UserDetails | null;
  didStoryDeleted: string;
  updatedProfile: string;
  unfollowedTag: string[];
  errorOnUnfollow: boolean;
  didUserAuth: boolean;
  notifications: Notification[] | null;
}

const initialState: ProfileState = {
  myStories: null,
  userDetails: null,
  didStoryDeleted: '',
  updatedProfile: '',
  unfollowedTag: [],
  errorOnUnfollow: false,
  didUserAuth: false,
  notifications: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('Not authenticated');
    const { data } = await profileApi.getProfile(uid);
    return data[0];
  },
);

export const deleteMyStory = createAsyncThunk(
  'profile/deleteMyStory',
  async (storyId: string) => {
    const { data } = await profileApi.deleteStory(storyId);
    return data;
  },
);

export const updateView = createAsyncThunk(
  'profile/updateView',
  async (storyId: string) => {
    await profileApi.updateView(storyId);
  },
);

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData: Record<string, unknown>) => {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('Not authenticated');
    const { data } = await profileApi.updateProfile(uid, profileData);
    return data;
  },
);

export const unFollowTag = createAsyncThunk(
  'profile/unFollowTag',
  async (tagName: string) => {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('Not authenticated');
    const { data } = await profileApi.unFollowTag(uid, tagName);
    return data;
  },
);

export const likeStory = createAsyncThunk(
  'profile/likeStory',
  async (data: Record<string, string>) => {
    const response = await profileApi.likeStory(data);
    return response.data;
  },
);

export const fetchNotifications = createAsyncThunk(
  'profile/fetchNotifications',
  async () => {
    const uid = localStorage.getItem('uid');
    if (!uid) throw new Error('Not authenticated');
    const { data } = await profileApi.getNotifications(uid);
    return data;
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetStoryDeleted: (state) => {
      state.didStoryDeleted = '';
    },
    resetProfileUpdate: (state) => {
      state.updatedProfile = '';
    },
    clearStoriesCache: (state) => {
      state.myStories = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.myStories = action.payload.stories;
        state.userDetails = action.payload.userDetails;
        state.didUserAuth = true;
      })
      .addCase(deleteMyStory.fulfilled, (state, action) => {
        state.didStoryDeleted = action.payload;
        state.myStories = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updatedProfile = action.payload;
      })
      .addCase(unFollowTag.fulfilled, (state, action) => {
        state.unfollowedTag = [...state.unfollowedTag, action.payload];
      })
      .addCase(unFollowTag.rejected, (state) => {
        state.errorOnUnfollow = true;
      })
      .addCase(likeStory.fulfilled, (state, action) => {
        if (state.myStories) {
          state.myStories = state.myStories.map((story) =>
            story._id === action.payload._id ? action.payload : story,
          );
        }
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      });
  },
});

export const { resetStoryDeleted, resetProfileUpdate, clearStoriesCache } = profileSlice.actions;
export default profileSlice.reducer;
