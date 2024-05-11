import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses:null
  },
  reducers: {
    setCourseReducer: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const {
  setCourseReducer
} = coursesSlice.actions;
export default coursesSlice.reducer;
