import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, search, sort } = params;

    const { data } = await axios.get<Pizza[]>(
      `https://813cecfc1deed960.mokky.dev/items?${category}&sortBy=${sort.sortProperty}&${search}`,
    );

    return data;
  },
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
export type SearchPizzaParams = {
  category: string;
  search: string;
  sort: string;
};

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING, //loading, success, error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,

  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
