import { createSlice } from '@reduxjs/toolkit';

const modalSlicer = createSlice({
  name: 'modal',
  initialState: {
    modal: false,
  },
  reducers: {
    toggleModal: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { toggleModal } = modalSlicer.actions;
export default modalSlicer.reducer;
