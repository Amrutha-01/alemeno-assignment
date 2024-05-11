import { useEffect } from "react";
import "./App.css";
import CourseListing from "./components/Course-Listing/CourseListing";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCourseReducer } from "./redux/coursesSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseDetails from "./components/Course-Details/CourseDetails";
import { ChakraProvider } from '@chakra-ui/react'
import Dasboard from "./components/Dasboard";
import AuthPage from "./components/AuthPage";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getCourseData() {
      const res = await axios.get(
        "https://courses-api-fe13.onrender.com/api/courses"
      );
      dispatch(setCourseReducer(res.data));
    }
    getCourseData();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage/>}/>
          <Route path="/course-listing" element={<CourseListing/>}/>
          <Route path="/course-details/:id" element={<CourseDetails/>}/>
          <Route path="/dashboard" element={<Dasboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
