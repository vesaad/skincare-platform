import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import routineReducer from "./slices/routineSlice";
import notificationReducer from "./slices/notificationSlice";
import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    routine: routineReducer,
    notifications: notificationReducer,
    cart: cartReducer,
  },
});
