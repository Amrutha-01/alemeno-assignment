import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firestore from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStudentsReducer } from "../redux/studentSlice";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { GetStudentData } from "./getStudentData";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    sid: "",
    email: "",
    password: "",
    name: "",
    likedCourses: [],
    enrolledCourses: [],
  });
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
  const studentsCollection = collection(firestore, "students");

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      const newStudent = {
        id: userCredential.user.uid,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        likedCourses: [],
        enrolledCourses: [],
      };
      const docRef = await addDoc(
        collection(firestore, "students"),
        newStudent
      );
      await updateDoc(doc(studentsCollection, docRef.id), {
        docId: docRef.id,
      });
      // const stuData = GetStudentData();
      console.log(studentData);
      dispatch(setStudentsReducer(studentData));
      console.log("Student added with ID: ", docRef.id);
      console.log("User signed up successfully!");
      navigate("/course-listing");
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };
  return (
    <div className="flex flex-col">
      <input
        type="text"
        className="mb-5 rounded-lg p-2 text-black"
        placeholder="Name.."
        value={userData.name}
        onChange={(e) => {
          setUserData({ ...userData, name: e.target.value });
        }}
      />
      <input
        type="email"
        className="mb-5 rounded-lg p-2 text-black"
        placeholder="Email..."
        value={userData.email}
        onChange={(e) => {
          setUserData({ ...userData, email: e.target.value });
        }}
      />
      <input
        type="password"
        className="mb-5 rounded-lg p-2 text-black"
        placeholder="Password..."
        value={userData.password}
        onChange={(e) => {
          setUserData({ ...userData, password: e.target.value });
        }}
      />
      <button onClick={handleSignup} className="bg-sky-700 text-black rounded-lg py-2 px-5 ">Sign Up</button>
    </div>
  );
};

export default Signup;
