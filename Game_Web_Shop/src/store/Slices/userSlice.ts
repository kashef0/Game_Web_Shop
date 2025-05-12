import { User } from '@/types/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UsersState {
  users: User[];
  selectedUser: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  status: 'idle',
  error: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersLoading: (state) => {
      state.status = 'loading';
    },
    usersReceived: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.status = 'succeeded';
    },
    userReceived: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
      state.status = 'succeeded';
    },
    userAdded: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    userUpdated: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    userDeleted: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
    usersError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    }
  }
});

export const { 
  usersLoading, 
  usersReceived, 
  userReceived,
  userAdded, 
  userUpdated, 
  userDeleted, 
  usersError 
} = usersSlice.actions;

export default usersSlice.reducer;