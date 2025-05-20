
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/auth';


// Definiera initialt autentisering
interface AuthState {
  user: User | null; 
  token: string | null;
  isAuthenticated: boolean; // Om användaren är inloggad eller inte
  loading: boolean; // Om en autentiseringstillståndsprocess är pågående
  error: string | null; 
}

// Initialt tillstånd för autentisering
const initialState: AuthState = {
  user: null, // Ingen användare inloggad 
  token: null,
  isAuthenticated: false, // Användaren är inte autentiserad
  loading: false, // Ingen laddning pågår 
  error: null, // Ingen felmeddelande 
};

// Skapa en slice för autentisering
const authSlice = createSlice({
  name: 'auth', // Namn på slice
  initialState,
  reducers: {
    // reducer som hanterar en lyckad inloggning
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Sätt användarinformation från payload
      state.isAuthenticated = true; // Sätt användaren som inloggad
      state.loading = false; // Ladda inte längre
      state.error = null; // Rensa eventuellt fel
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    
    // reducer som hanterar en lyckad registrering
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload; 
      state.isAuthenticated = true; 
      state.loading = false; 
    },
    // reducer för utloggning
    logout: (state) => {
      state.user = null; // Rensa användarinformation
      state.isAuthenticated = false; 
    },
  },
});


export const {
  loginSuccess,
  registerSuccess,
  updateUserProfile,
  setToken,
  logout,
} = authSlice.actions;

// exportera reducer för användning i store
export default authSlice.reducer;