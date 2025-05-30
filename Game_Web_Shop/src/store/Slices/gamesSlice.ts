import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullGame, Games, GameTrailer } from '../../types/Game';

interface GamesState {
  games: FullGame[];
  gamePreview: GameTrailer[];
  previewGameId: number | null;
  onSearchText: string | null;
  selectedGame: Games | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  isLoading: boolean
}

const initialState: GamesState = {
  games: [],
  gamePreview: [],
  previewGameId: null,
  onSearchText: null,
  selectedGame: null,
  status: 'idle',
  error: null,
  isLoading: false
};


const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    gamesLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    gamesReceived: (state, action: PayloadAction<FullGame[]>) => {
      state.games = action.payload;
      state.status = 'succeeded';
    },
    gameAdded: (state, action: PayloadAction<FullGame>) => {
      state.games.push(action.payload);
    },
    gameUpdated: (state, action: PayloadAction<FullGame>) => {
      const index = state.games.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.games[index] = action.payload;
      }
    },
    gamePreview: (state, action: PayloadAction<GameTrailer>) => {
      state.gamePreview.push(action.payload);
      
    },
    gamePreviewId: (state, action: PayloadAction<number>) => {
      state.previewGameId = action.payload
    },
    onSearch: (state, action: PayloadAction<string>) => {
      state.onSearchText = action.payload;
    },
    gamesError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    }
  }
});

export const { 
  gamesLoading, 
  gamesReceived, 
  gameAdded, 
  gameUpdated,
  onSearch,
  gamePreview,
  gamePreviewId,
  gamesError 
} = gamesSlice.actions;

export default gamesSlice.reducer;