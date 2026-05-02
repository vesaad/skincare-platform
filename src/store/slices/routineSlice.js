import { createSlice } from "@reduxjs/toolkit";

const routineSlice = createSlice({
  name: "routine",
  initialState: { data: null, loading: false },
  reducers: {
    setRoutine: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setRoutine, setLoading } = routineSlice.actions;
export default routineSlice.reducer;
