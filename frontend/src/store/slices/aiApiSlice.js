import { apiSlice } from '../apiSlice';

export const aiApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendChatMessage: builder.mutation({
      query: (data) => ({
        url: '/api/ai/chat',
        method: 'POST',
        body: data,
      }),
    }),
    getAiRecommendations: builder.query({
      query: (productId) => `/api/ai/recommendations/${productId}`,
      // Cache the AI's response for 1 hour so we don't spam the API for the same product
      keepUnusedDataFor: 3600, 
    }),
  }),
});

export const { useSendChatMessageMutation, useGetAiRecommendationsQuery } = aiApiSlice;