import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
// Define our base API URL (pointing to our Node/Express backend)
const baseQuery = fetchBaseQuery({ baseUrl });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'User'], // Used for automatic caching and re-fetching
  endpoints: (builder) => ({}), // We will inject endpoints in separate files to keep code clean
});