import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {searchProductsApi} from '../services/api';

export const searchProducts = createAsyncThunk(
  'search/searchProducts',
  async (query: string, {rejectWithValue}) => {
    if (!query) return {products: []};
    try {
      const data = await searchProductsApi(query);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface SearchState {
  query: string;
  results: any[];
  isSearching: boolean;
}

const initialState: SearchState = {
  query: '',
  results: [],
  isSearching: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isSearching = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isSearching = false;
        state.results = action.payload.products;
      })
      .addCase(searchProducts.rejected, (state) => {
        state.isSearching = false;
      });
  },
});

export const {setQuery, clearSearch} = searchSlice.actions;
export default searchSlice.reducer;
