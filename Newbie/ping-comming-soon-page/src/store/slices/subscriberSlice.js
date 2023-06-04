import { createSlice } from "@reduxjs/toolkit";
import { checkAndAddSubscriber } from "../thunks/checkAndAddSubscriber.js";

const subscriberSlice = createSlice({
  name: "subscriber",
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  extraReducers(builder) {
    builder
      .addCase(checkAndAddSubscriber.pending, (state, _) => {
        state.isLoading = true;
      })
      .addCase(checkAndAddSubscriber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(checkAndAddSubscriber.rejected, (state, action) => {
        console.log("action", action);
        state.isLoading = false;
        state.error = action.error;
        console.log("state", state.error);
      });
  },
});

export const subscriberReducer = subscriberSlice.reducer;
