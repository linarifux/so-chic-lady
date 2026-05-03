import { apiSlice } from '../apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // FETCH ALL
    getProducts: builder.query({
      query: () => '/api/products',
      providesTags: ['Product'],
    }),
    
    // FETCH ONE
    getProductDetails: builder.query({
      query: (productId) => `/api/products/${productId}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),

    // --- NEW ADMIN MUTATIONS ---

    // CREATE (Draft)
    createProduct: builder.mutation({
      query: () => ({
        url: '/api/products',
        method: 'POST',
      }),
      // This forces the 'getProducts' query to run again automatically!
      invalidatesTags: ['Product'], 
    }),

    // UPDATE
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/api/products/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),

    // DELETE
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/products/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

  }),
});

export const { 
  useGetProductsQuery, 
  useGetProductDetailsQuery,
  // Export our new hooks!
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation
} = productsApiSlice;