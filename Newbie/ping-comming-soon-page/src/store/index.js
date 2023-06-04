import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { subscribersApi } from "./apis/subscribersApi";
import { subscriberReducer } from "./slices/subscriberSlice";

const store = configureStore({
  reducer: {
    subscriber: subscriberReducer,
    subscribers: subscribersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(subscribersApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store };
export { checkAndAddSubscriber } from "./thunks/checkAndAddSubscriber.js";
export {
  useAddSubscriberMutation,
  useFetchSubscriberQuery,
} from "./apis/subscribersApi";
