import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTenant = createAsyncThunk(
  "tenant/fetchTenant",
  async (_, { getState, rejectWithValue }) => {
    const apiKey = getState().cart.apiKey;
    const existingTenantId = getState().tenant.tenantId;

    if (!apiKey) return rejectWithValue("API key missing!");

    // ✅ Tenant already exists, don't fetch again
    if (existingTenantId) return existingTenantId;

    const response = await fetch(
      "https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com/tenants",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-zocom": apiKey,
        },
        body: JSON.stringify({ name: "fruityfoods" }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${errorText}`);
    }

    const data = await response.json();
    return data.id;
  }
);

const tenantSlice = createSlice({
  name: "tenant",
  initialState: { tenantId: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTenant.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tenantId = action.payload;
      })
      .addCase(fetchTenant.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default tenantSlice.reducer;
