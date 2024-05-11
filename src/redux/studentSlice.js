import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
  },
  reducers: {
    setStudentsReducer: (state, action) => {
      state.students = action.payload;
    },
  },
});

export const { setStudentsReducer } = studentSlice.actions;
export default studentSlice.reducer;
