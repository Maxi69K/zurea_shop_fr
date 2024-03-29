import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    totalCount: 0,
    totalPrice: 0,
    user: {},
  },
  reducers: {
    addToCart: (state, action) => {
      let copyArray = [...state.cart];
      let findIndex = copyArray.findIndex(
        (el) => el._id === action.payload._id
      );
      if (findIndex === -1) {
        copyArray.push({
          ...action.payload,
          count: action.payload.count || 1,
          cartTotal: action.payload.price * (action.payload.count || 1),
        });
        state.totalPrice += action.payload.price * (action.payload.count || 1);
        state.totalCount++;
      } else {
        copyArray[findIndex].count += action.payload.count || 1;
        copyArray[findIndex].cartTotal +=
          action.payload.price * (action.payload.count || 1);
        state.totalPrice += action.payload.price * (action.payload.count || 1);
      }
      state.cart = copyArray;
      cartSlice.caseReducers.updateLocalStorage(state);
    },
    restoreCart: (state, action) => {
      let product = action.payload;
      state.cart = product.cart;
      state.totalPrice = product.totalPrice;
      state.totalCount = product.totalCount;
    },
    deleteFromCart: (state, action) => {
      let { id } = action.payload;
      //console.log(id, index);
      let copyCart = [...state.cart];

      state.totalCount--;
      state.cart = copyCart.filter((el) => {
        return el._id !== id;
      });
      state.totalPrice = subTotal(copyCart);
      cartSlice.caseReducers.updateLocalStorage(state);
    },
    setPrice: (state, action) => {
      const { increment, index } = action.payload;
      let copyArray = [...state.cart];
      copyArray[index].cartTotal += copyArray[index].price * increment;
      state.totalPrice = subTotal(copyArray);

      if (copyArray[index].count === 1 && increment === -1) {
        copyArray.splice(index, 1);
        state.totalPrice = subTotal(copyArray);
        state.totalCount--;
      } else {
        copyArray[index].count += increment;
      }

      state.cart = copyArray;
      cartSlice.caseReducers.updateLocalStorage(state);
    },

    updateLocalStorage: (state) => {
      localStorage.setItem(
        'cart',
        JSON.stringify({
          cart: state.cart,
          totalCount: state.totalCount,
          totalPrice: state.totalPrice,
        })
      );
    },

    setCustomer: (state, action) => {
      state.user = action.payload;
    },
  },
});

function subTotal(cart) {
  return cart.reduce((acc, current) => {
    return acc + current.cartTotal;
  });
}

export const { addToCart, restoreCart, deleteFromCart, setPrice, setCustomer } =
  cartSlice.actions;

export default cartSlice.reducer;
