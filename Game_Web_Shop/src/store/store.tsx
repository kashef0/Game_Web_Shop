import { configureStore } from "@reduxjs/toolkit";



export const store = configureStore({
  reducer: {

  },
});

// exporterar RootState för att definiera typen av applikationens globalt
export type RootState = ReturnType<typeof store.getState>; 


export type AppDispatch = typeof store.dispatch;