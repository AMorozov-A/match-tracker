import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Match } from '../services/matchService';
import { fetchMatches } from '../services/matchService';

interface MatchesState {
  items: Match[];
  loading: boolean;
  error: boolean;
}

const initialState: MatchesState = {
  items: [],
  loading: false,
  error: false,
};

export const fetchMatchesThunk = createAsyncThunk('matches/fetch', async () => {
  const matches = await fetchMatches();
  return matches;
});

export const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    updateMatches: (state, action) => {
      state.items = action.payload;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchesThunk.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchMatchesThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(fetchMatchesThunk.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { updateMatches } = matchesSlice.actions;
export default matchesSlice.reducer;
