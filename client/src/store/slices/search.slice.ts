import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchApi } from '../../api/search.api';
import { Story, TagResult } from '../../types/story.types';

interface SearchState {
  topTags: TagResult[] | null;
  isErrorOnTopTags: boolean;
  tagStories: Story[] | null;
  tagName: string;
}

const initialState: SearchState = {
  topTags: null,
  isErrorOnTopTags: false,
  tagStories: null,
  tagName: '',
};

export const fetchTopTags = createAsyncThunk(
  'search/fetchTopTags',
  async () => {
    const { data } = await searchApi.topTags();
    return data;
  },
);

export const fetchTagStories = createAsyncThunk(
  'search/fetchTagStories',
  async (tagName: string) => {
    const { data } = await searchApi.tagStories(tagName);
    return { stories: data, tagName };
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopTags.fulfilled, (state, action) => {
        state.topTags = action.payload;
      })
      .addCase(fetchTopTags.rejected, (state) => {
        state.isErrorOnTopTags = true;
      })
      .addCase(fetchTagStories.fulfilled, (state, action) => {
        state.tagStories = action.payload.stories;
        state.tagName = action.payload.tagName;
      });
  },
});

export default searchSlice.reducer;
