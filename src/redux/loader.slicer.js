import { createSlice } from '@reduxjs/toolkit';

const loaderSlicer = createSlice({
  name: 'loader',
  initialState: {
    loader: false,
  },
  reducers: {
    toggleLoader: (state, action) => {
      state.loader = action.payload;
    },
  },
});

export const { toggleLoader } = loaderSlicer.actions;
export default loaderSlicer.reducer;
