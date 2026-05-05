import { apiSlice } from '../apiSlice';

export const configApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoreConfig: builder.query({
      query: () => '/api/config',
      keepUnusedDataFor: 5,
    }),
    updateStoreConfig: builder.mutation({
      query: (data) => ({
        url: '/api/config',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useGetStoreConfigQuery, useUpdateStoreConfigMutation } = configApiSlice;