import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: { list: [], total: 0, loading: false, filters: {} },
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload.products;
      state.total = action.payload.total;
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
