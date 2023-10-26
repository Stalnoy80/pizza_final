import { configureStore } from '@reduxjs/toolkit';
import filter from './filterSlice.ts';
import cart from './cartSlice.ts';
import pizza from './pizzaSlice.ts';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
