import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Typ för ett objekt i varukorgen
export interface CartItem {
  game: any;
  quantity: number;
  isRental: boolean;
  rentalDuration?: number;
}

interface CartState {
  items: CartItem[]; // Lista med spel i varukorgen
} 

const initialState: CartState = {
  items: [],
};
// Skapar en slice med initialt tillstånd och reducer
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const { game, isRental } = action.payload;
      const exists = state.items.find(
        (item) => item.game._id === game._id && item.isRental === isRental
      );
      if (exists) {
        if (!isRental) {
          exists.quantity += action.payload.quantity; // Ökar endast kvantitet om det är ett köp
        }
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.game._id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;


