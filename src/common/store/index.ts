import { configureStore } from '@reduxjs/toolkit'

import threadsSlice from './threadsSlice'

export const store = configureStore({
  reducer: {
    threadsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch