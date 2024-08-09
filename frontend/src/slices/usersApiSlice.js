// import { USER_URL } from "../constants";
// import { apiSlice } from "./apiSlice";

// const usersApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (data) => ({
//         url: `${USER_URL}/login`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     userLogout: builder.mutation({
//       query: () => ({
//         url: `${USER_URL}/logout`,
//         method: "POST",
//       }),
//     }),
//     updateUserProfile: builder.mutation({
//       query: (data) => ({
//         url: `${USER_URL}/profile`,
//         method: "PUT",
//         body: data,
//       }),
//     }),
//     signUp: builder.mutation({
//       query: (data) => ({
//         url: `${USER_URL}/signup`,
//         method: "POST",
//         body: data,
//       }),
//     }),
//     getUserById: builder.query({
//       query: (id) => ({
//         url: `${USER_URL}/${id}`,
//       }),
//     }),
//     updateUser: builder.mutation({
//       query: (data) => ({
//         url: `${USER_URL}/${data.id}`,
//         method: "PUT",
//         body: data,
//       }),
//       invalidatesTags: [{ type: "User", id: data.id }],
//     }),
//     deleteUser: builder.mutation({
//       query: (id) => ({
//         url: `${USER_URL}/${id}`,
//         method: "DELETE",
//       }),
//     }),
//     getUsers: builder.query({
//       query: () => ({
//         url: USER_URL,
//       }),
//       providesTags: ["User"],
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useUserLogoutMutation,
//   useUpdateUserProfileMutation,
//   useSignUpMutation,
//   useGetUserByIdQuery,
//   useUpdateUserMutation,
//   useDeleteUserMutation,
//   useGetUsersQuery,
// } = usersApiSlice;

import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    userLogout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
    getUserById: builder.query({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USER_URL}`,
      }),
      providesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const {
  useLoginMutation,
  useUserLogoutMutation,
  useUpdateUserProfileMutation,
  useSignUpMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
} = usersApiSlice;
