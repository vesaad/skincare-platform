import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import routineReducer from "./slices/routineSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    routine: routineReducer,
  },
});
