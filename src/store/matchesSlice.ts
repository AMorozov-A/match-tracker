import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { Match } from '../services/matchService';
import { fetchMatches } from '../services/matchService';
import type { RootState } from './index';

interface MatchesState {
  items: Match[];
  loading: boolean;
  error: boolean;
  selectedStatus: 'all' | 'live' | 'finished' | 'preparing';
}

const initialState: MatchesState = {
  items: [],
  loading: false,
  error: false,
  selectedStatus: 'all',
};

export const fetchMatchesThunk = createAsyncThunk('matches/fetch', async (_, { rejectWithValue }) => {
  try {
    return await fetchMatches();
  } catch {
    return rejectWithValue('Ошибка при загрузке матчей');
  }
});

export const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    updateMatches: (state, action) => {
      state.items = action.payload;
      state.error = false;
    },
    setSelectedStatus: (state, action) => {
      state.selectedStatus = action.payload;
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

export const selectMatches = (state: RootState) => state.matches.items;
export const selectLoading = (state: RootState) => state.matches.loading;
export const selectError = (state: RootState) => state.matches.error;
export const selectSelectedStatus = (state: RootState) => state.matches.selectedStatus;

export const selectFilteredMatches = createSelector(
  [selectMatches, selectSelectedStatus],
  (matches, selectedStatus) => {
    if (selectedStatus === 'all') return matches;
    return matches.filter((match) => match.status.toLowerCase() === selectedStatus);
  }
);

export const { updateMatches, setSelectedStatus } = matchesSlice.actions;
export default matchesSlice.reducer;
