// src/store/Slices/genreSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Genre, Platform } from '@/types/Game';

interface GenreState {
  genres: Genre[];
  platform: Platform[];
  platformName: string | null;
  genreName: string | null;
  selectedGenreId: number | null;
  selectedRelevance: string | null;
  selectedPlatformId: number | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean
}

const initialState: GenreState = {
  genres: [],
  platform: [],
  selectedGenreId: null,
  selectedPlatformId: null,
  selectedRelevance: null,
  status: 'idle',
  error: null,
  isLoading: true,

  genreName: null,
  platformName: null,
};

const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    genresLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    genresReceived: (state, action: PayloadAction<Genre[]>) => {
      state.genres = action.payload;
      state.status = 'succeeded';
      state.isLoading = false
    },
    genresError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isLoading = false
    },
    setSelectedGenre: (state, action: PayloadAction<number | null>) => {
      state.selectedGenreId = action.payload;
    },
    selectedPlatformId: (state, action: PayloadAction<number | null>) => {
      state.selectedPlatformId = action.payload;
    },

    resetFilters: (state) => {
      state.selectedGenreId = null;
      state.selectedPlatformId = null;
      state.selectedRelevance = null;
    },
    selectedRelevanceId: (state, action: PayloadAction<string | null>) => {
      state.selectedRelevance = action.payload;
    },
    platformsReceived: (state, action: PayloadAction<Platform[]>) => {
      state.platform = action.payload;
      state.status = 'succeeded';
      state.isLoading = false
    },


    setPlatformName: (state, action: PayloadAction< string | null>) => {
      state.platformName = action.payload;
    },
    setGenreName: (state, action: PayloadAction< string | null>) => {
      state.genreName = action.payload;
    },


    platformsError: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isLoading = false
    },
  },
});

export const {
  genresLoading,
  genresReceived,
  genresError,
  resetFilters,
  setSelectedGenre,
  selectedPlatformId,
  selectedRelevanceId,
  platformsReceived,
  platformsError,


  setPlatformName,
  setGenreName,
} = genreSlice.actions;

export default genreSlice.reducer;
