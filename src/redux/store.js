import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import tenantReducer from "./tenantSlice.js"; // ✅ Import tenant slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    tenant: tenantReducer, // ✅ Add tenant slice
  },
});

export default store;
