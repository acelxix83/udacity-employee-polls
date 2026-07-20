import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { useDispatch } from "react-redux";
import logger from "./middleware/logger";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type { RootState } from "./reducers";
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
