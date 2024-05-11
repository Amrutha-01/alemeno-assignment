import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import profile from "./profile.png";
import { GetStudentData } from "./getStudentData";
import axios from "axios";
import firestore from "../firebase/firebase";
import { auth } from "../firebase/firebase";
import { Progress } from "@chakra-ui/react";

const Dasboard = () => {
  const [student, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedCourses, setCompletedCourses] = useState(new Set());

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

  const handleCheckboxChange = (courseId) => {
    if (completedCourses.has(courseId)) {
      // Uncheck checkbox and mark as incomplete
      setCompletedCourses((prev) => {
        const updatedSet = new Set(prev);
        updatedSet.delete(courseId);
        return updatedSet;
      });
    } else {
      // Check checkbox and mark as complete
      setCompletedCourses((prev) => new Set(prev).add(courseId));
    }
  };

  console.log(student);
  return (
    <div>
      <div className="profile-info bg-slate-800 flex items-center pl-32 sm:pl-10 ">
        <img src={profile} className="h-48 mr-44" />
        <div className="text-white text-left">
          <h1 className="text-5xl mb-4">{student.name}</h1>
          <p className="text-xl">{student.email}</p>
        </div>
      </div>
      <h1 className="text-4xl mt-5">Enrolled Courses</h1>
      {student ? (
        <div className="enrolled-courses flex flex-col ">
          {student.enrolledCourses.map((course) => (
            <div key={course.id}>
              <div className="enrolled-course flex p-5 border-4 h-48 rounded-md border-black my-5 w-3/5 items-center m-48">
                <img
                  src={course.thumbnail}
                  height={250}
                  width={200}
                  className="m-3"
                />
                <div className="right-part">
                  <h1 className="text-2xl mb-5">{course.courseName}</h1>
                  <div className="flex justify-between">
                    <p className="font-semibold">By {course.instructor}</p>
                    <div>
                      <p>
                        {completedCourses.has(course.cid)
                          ? "100% completed"
                          : `${course.status}% completed`}
                      </p>
                      <input
                        type="checkbox"
                        checked={completedCourses.has(course.cid)}
                        onChange={() => handleCheckboxChange(course.cid)}
                      />
                    </div>
                  </div>
                  <Progress
                    hasStripe
                    colorScheme="green"
                    width="300px"
                    value={
                      completedCourses.has(course.cid) ? 100 : course.status
                    }
                    visibility={"visible"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dasboard;
