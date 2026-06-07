import { createSlice } from "@reduxjs/toolkit";

const routineSlice = createSlice({
  name: "routine",
  initialState: {
    data: null,
    profile: null,
    savedRoutineId: null,
    loading: false,
  },
  reducers: {
    setRoutine: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setSavedRoutineId: (state, action) => {
      state.savedRoutineId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetRoutine: (state) => {
      state.data = null;
      state.profile = null;
      state.savedRoutineId = null;
      state.loading = false;
      localStorage.removeItem("persist:routine");
    },
  },
});

export const { setRoutine, setProfile, setSavedRoutineId, setLoading, resetRoutine } =
  routineSlice.actions;
export default routineSlice.reducer;
