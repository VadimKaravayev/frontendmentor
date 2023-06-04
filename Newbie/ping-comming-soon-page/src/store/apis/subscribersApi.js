import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const subscribersApi = createApi({
  reducerPath: "subscribers",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:3001",
  }),
  endpoints(builder) {
    return {
      addSubscriber: builder.mutation({
        query: (email) => {
          return {
            url: "/subscribers",
            method: "POST",
            body: {
              email,
            },
          };
        },
      }),
      fetchSubscriber: builder.query({
        query: (email) => {
          return {
            url: "/subscribers",
            params: {
              email,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useAddSubscriberMutation, useFetchSubscriberQuery } =
  subscribersApi;
export { subscribersApi };
