import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {fetchProductsApi} from '../services/api';

export const fetchProducts = createAsyncThunk(
  'data/fetchProducts',
  async ({limit, skip}: {limit: number; skip: number}, {rejectWithValue}) => {
    try {
      const data = await fetchProductsApi(limit, skip);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface DataState {
  items: any[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  total: number;
  skip: number;
}

const initialState: DataState = {
  items: [],
  isLoading: false,
  isRefreshing: false,
  error: null,
  total: 0,
  skip: 0,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetData: (state) => {
      state.items = [];
      state.skip = 0;
      state.total = 0;
    },
    setRefreshing: (state, action: PayloadAction<boolean>) => {
      state.isRefreshing = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        // Merge items for infinite scroll, handle duplicates if necessary
        const newItems = action.payload.products;
        state.items = state.skip === 0 ? newItems : [...state.items, ...newItems];
        state.total = action.payload.total;
        state.skip = state.skip + newItems.length;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {resetData, setRefreshing} = dataSlice.actions;
export default dataSlice.reducer;
