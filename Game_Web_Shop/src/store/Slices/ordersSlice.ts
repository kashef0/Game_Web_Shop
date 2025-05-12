
import { Order } from '@/types/order';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface OrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  selectedOrder: null,
  status: 'idle',
  error: null
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    ordersLoading: (state) => {
      state.status = 'loading';
    },
    ordersReceived: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.status = 'succeeded';
    },
    orderReceived: (state, action: PayloadAction<Order>) => {
      state.selectedOrder = action.payload;
      state.status = 'succeeded';
    },
    orderAdded: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
    orderStatusUpdated: (state, action: PayloadAction<{orderId: string, status: string}>) => {
      const order = state.orders.find(o => o._id === action.payload.orderId);
      if (order) {
        state.status = 'succeeded';
      }
    },
    ordersError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    }
  }
});

export const { 
  ordersLoading, 
  ordersReceived, 
  orderReceived,
  orderAdded, 
  orderStatusUpdated, 
  ordersError 
} = ordersSlice.actions;

export default ordersSlice.reducer;