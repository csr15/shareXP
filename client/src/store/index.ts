import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import profileReducer from './slices/profile.slice';
import storyReducer from './slices/story.slice';
import searchReducer from './slices/search.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    story: storyReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
