import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { airQuailtySlice } from "../Features/AirQuality-api-slice";
import { newsSlice } from "../Features/news-slice";
// import { apiSlice } from "../features/coins/coins-api-slice";

// automaticlly add thunk middle
// wrapper createSotore
// rectdev tool is on
// develoment checks are on by default
export const store = configureStore({
  reducer: {
    // automatically call combined Reducer
    // counter: counterReducer,
    [airQuailtySlice.reducerPath]: airQuailtySlice.reducer,
    [newsSlice.reducerPath]: newsSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => {
    // adding for consuming API
    return getDefaultMiddleware().concat(airQuailtySlice.middleware); // magical Line
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
