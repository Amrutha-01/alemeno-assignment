import React, { useEffect, useState } from "react";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import firestore from "../../firebase/firebase";
import { getStudentData } from "../getStudentData";
import { getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Progress } from "@chakra-ui/react";
import {
  addDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { removeStudent } from "../../redux/studentSlice";
import { auth } from "../../firebase/firebase";
import { setStudentsReducer } from "../../redux/studentSlice";

const CourseListing = () => {
  const [searchString, setSearchString] = useState("");
  const dispatch = useDispatch();
  let courses = useSelector((state) => state.coursesData.courses);
  let students = useSelector((state) => state.studentsData.students);
  // const currentUser = auth.currentUser;
  // console.log(currentUser);

  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    setFilteredCourses(courses);
  }, [courses]);

  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const q = query(
          collection(firestore, "students"),
          where("id", "==", userId)
        );

        try {
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const studentInfo = querySnapshot.docs[0].data();
            console.log("Student Data:", studentInfo);
            setStudentData(studentInfo);
            dispatch(setStudentsReducer(studentData));
          } else {
            console.log("No student found for the current user");
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleOnSearch = () => {
    // Filter courses based on searchString
    const filtered = courses.filter(
      (course) =>
        course.name.toLowerCase().includes(searchString.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchString.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  const handleSearch = (e) => {
    setSearchString(e.target.value);
  };
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log("User signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div>
      <div className="navbar flex bg-slate-800 text-white p-5 text-lg justify-end pr-10 mb-5">
        <Link
          to="/dashboard"
          className="bg-slate-100 text-black rounded-lg px-5 py-2"
        >
          Student Dashboard
        </Link>
        <button onClick={handleSignOut} className="ml-6 text-bold">
          Sign Out
        </button>
      </div>
      <div className="search-comp">
        <h1 className="text-4xl mb-5">Explore Courses</h1>
        <div className="search-bar flex justify-center">
          <input
            type="text"
            className="border-2 rounded-md border-slate-600 p-1 w-5/12 mr-4"
            value={searchString}
            onChange={handleSearch}
            placeholder="Search by course name or instructor name"
          />
          <button
            className="bg-black text-white rounded-md w-20"
            onClick={handleOnSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="search-result flex flex-col justify-center items-center w-full">
        {filteredCourses ? (
          filteredCourses.map((item) => (
            <Link
              to={`/course-details/${item.id}`}
              className="card flex w-11/12 justify-center p-3 h-48 my-8"
              key={item.id}
            >
              <div
                className="card flex w-3/5 justify-between border-4 p-3 h-48 rounded-md border-black my-8"
                style={{ boxShadow: "12px 12px" }}
              >
                <img
                  src={item.thumbnail}
                  height={450}
                  width={450}
                  className="m-3"
                />
                <div className="my-3 mr-10 flex flex-col justify-center">
                  <h3 className="text-left text-3xl font-bold w-full">
                    {item.name}
                  </h3>
                  <div className="flex justify-between w-64">
                    <p className="font-semibold">By {item.instructor}</p>
                    <p className="font-semibold">{item.duration}</p>
                  </div>
                  <p className="text-justify">
                    {item.description.slice(0, 90) + "..."}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="mt-10">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default CourseListing;
