import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface DataState {
  items: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DataState = {
  items: [
    {id: '1', title: 'First Item (Redux)'},
    {id: '2', title: 'Second Item (Redux)'},
    {id: '3', title: 'Third Item (Redux)'},
  ],
  isLoading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setItems: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {setLoading, setItems, setError} = dataSlice.actions;
export default dataSlice.reducer;
