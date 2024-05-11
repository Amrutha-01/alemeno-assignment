import { configureStore } from '@reduxjs/toolkit';
import courseReducer from "../redux/coursesSlice"
import studentReducer from "../redux/studentSlice"

const store = configureStore({
  reducer: {
    coursesData:courseReducer,
    studentsData:studentReducer,
  },
});

export default store;
