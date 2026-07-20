import { configureStore } from "@reduxjs/toolkit";
import reducers, { type RootState } from "./reducers";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import logger from "./middleware/logger";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type { RootState } from "./reducers";
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
