import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define our base API URL (pointing to our Node/Express backend)
const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5000' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'User'], // Used for automatic caching and re-fetching
  endpoints: (builder) => ({}), // We will inject endpoints in separate files to keep code clean
});