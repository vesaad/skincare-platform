import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: { list: [], total: 0, loading: false, filters: {} },
  reducers: {
    setProducts: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        state.list = payload;
      } else {
        state.list = payload?.products ?? [];
        state.total = payload?.total ?? 0;
      }
      state.loading = false;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setFilters, setLoading } = productsSlice.actions;
export default productsSlice.reducer;
