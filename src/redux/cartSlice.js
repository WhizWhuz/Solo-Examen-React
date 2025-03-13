import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Async thunk to fetch API key
export const fetchApiKey = createAsyncThunk("cart/fetchApiKey", async () => {
  const response = await fetch(
    "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/keys",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!response.ok) throw new Error("Failed to fetch API key");
  const data = await response.json();
  return data.key;
});

// ✅ Async thunk to send order & get ETA
export const sendOrder = createAsyncThunk(
  "cart/sendOrder",
  async ({ tenantId, cartItems }, { getState }) => {
    const apiKey = getState().cart.apiKey;

    if (!apiKey) throw new Error("API key is missing!");

    const response = await fetch(
      `https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/${tenantId}/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-zocom": apiKey,
        },
        body: JSON.stringify({ items: cartItems }),
      }
    );

    if (!response.ok) throw new Error("Failed to place order");
    const data = await response.json();
    return data.eta;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    apiKey: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiKey.fulfilled, (state, action) => {
        state.apiKey = action.payload;
      })
      .addCase(sendOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.eta = action.payload;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// ✅ Export actions separately
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// ✅ Explicitly export your async thunks

export default cartSlice.reducer;
