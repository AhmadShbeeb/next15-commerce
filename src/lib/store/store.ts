import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import { useSelector as useBaseSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer, PERSIST, PAUSE, FLUSH, REHYDRATE, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  cart: cartReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector;
export const persistor = persistStore(store);
