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
  },
});

export const { setRoutine, setProfile, setSavedRoutineId, setLoading } =
  routineSlice.actions;
export default routineSlice.reducer;
