import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  cart: {
    totalPrice: 0,
    products: [],
    productId: []
  }
};

const userSlicer = createSlice({
  name: 'user',
  // exported reducer
  initialState: initialState,
  // define all actions
  reducers: {
    saveUser(state, data) {
        //console.log('save user', data.payload);
      state.user = data.payload;
    },
    removeUser(state) {
      state.user = null;
    },
    // addToCart: (state, action) => {
    //   let product = action.payload;
    //   let foundIndex = null;
    //   let foundProduct = state.cart.products.find((el, index) => {
    //     foundIndex = index;
    //     return el._id === product._id;
    //   })
    // }
  }
});

export const { saveUser, removeUser, addToCart } = userSlicer.actions;
export default userSlicer.reducer;