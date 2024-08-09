import { ORDER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (order) => ({
        url: `${ORDER_URL}/addorder`,
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/myorders`,
      }),
      keepUnusedDataFor: 5,
    }),
    getAllOrders: builder.query({
      query: () => ({
        url: ORDER_URL,
      }),
    }),
    deliverOrder: builder.mutation({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/deliver`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrderByIdQuery,
  useGetOrdersQuery,
  useGetAllOrdersQuery,
  useDeliverOrderMutation,
} = orderSlice;
