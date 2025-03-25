import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    eta: null,
    status: "idle",
    error: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      existingItem
        ? existingItem.quantity++
        : state.items.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      item.quantity > 1
        ? item.quantity--
        : (state.items = state.items.filter((i) => i.id !== action.payload));
    },
    clearCart: (state) => {
      state.items = [];
    },
    setEta: (state, action) => {
      state.eta = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setEta } =
  cartSlice.actions;
export default cartSlice.reducer;
