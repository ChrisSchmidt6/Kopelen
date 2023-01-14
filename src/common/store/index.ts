import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./authSlice";
import threadsSlice from "./threadsSlice";

export const store = configureStore({
  reducer: {
    authSlice,
    threadsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
