import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {},
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      let item = action.payload;
      let exists = state.cartItems.find((i) => i._id === item._id);
      if (exists) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === exists._id ? item : x
        );
      } else state.cartItems = [...state.cartItems, action.payload];

      return updateCart(state);
    },
    removeItem: (state, action) => {
      let itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id != itemId);
      localStorage.setItem("cart", JSON.stringify(state));
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, saveShippingAddress } = cartSlice.actions;
export default cartSlice.reducer;
