import { api } from "../api/baseApi";

const cardSlices = api.injectEndpoints({
  endpoints: (build) => ({
    addCard: build.mutation({
      query: (cardData) => ({
        url: "/app/addCard",
        method: "POST",
        body: cardData,
      }),
      invalidatesTags: ["card"],
    }),
    getCards: build.query({
      query: () => ({
        url: "/app/getCards",
        method: "GET",
      }),
      providesTags: ["card"],
    }),
    deleteCard: build.mutation({
      query: (cardId) => ({
        url: `/app/removeCard/${cardId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["card"],
    }),
  }),
});

export const { useAddCardMutation, useGetCardsQuery, useDeleteCardMutation } =
  cardSlices;
