import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import { useSelector as useBaseSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useBaseSelector;
