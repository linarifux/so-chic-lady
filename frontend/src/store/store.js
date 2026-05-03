import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    // We will add our slices here later (e.g., cart: cartReducer, ai: aiReducer)
  },
});