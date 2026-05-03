import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice.js';
import authReducer from './slices/authSlice.js';
import { apiSlice } from './apiSlice.js';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});