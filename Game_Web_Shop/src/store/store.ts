import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import gamesReducer from './Slices/gamesSlice';
import ordersReducer from './Slices/ordersSlice';
import genreReducer from './Slices/genreSlice';
import cartReducer from '../store/Slices/cartSlice'
import messageReducer from './Slices/messageSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,  // Hanterar användarinloggning och autentisering
    games: gamesReducer,  // Hanterar speldatan
    orders: ordersReducer, // Hanterar orderhistorik och detaljer
    genre: genreReducer, // Hanterar genres
    cart: cartReducer,   // Hanterar varukorgen
    message: messageReducer,
  }
});
// Typdefinitioner för att använda i hela appen
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;