import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authReducer from "./slices/authSlice";
import productsReducer from "./slices/productsSlice";
import routineReducer from "./slices/routineSlice";
import notificationReducer from "./slices/notificationSlice";

const storage = {
  getItem: (key) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(localStorage.removeItem(key)),
};

const routinePersistConfig = { key: "routine", storage };
const authPersistConfig    = { key: "auth",    storage };

export const store = configureStore({
  reducer: {
    auth:          persistReducer(authPersistConfig, authReducer),
    products:      productsReducer,
    routine:       persistReducer(routinePersistConfig, routineReducer),
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