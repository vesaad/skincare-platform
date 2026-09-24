import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authReducer from "../features/auth/auth.slice";
import productsReducer from "../features/products/products.slice";
import routineReducer from "../features/routines/routine.slice";
import notificationReducer from "../features/notifications/notification.slice";

const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const authPersistConfig    = { key: "auth",    storage };

export const store = configureStore({
  reducer: {
    auth:          persistReducer(authPersistConfig, authReducer),
    products:      productsReducer,
    routine:       routineReducer,
    notifications: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
