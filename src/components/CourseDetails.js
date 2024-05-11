import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import firestore from "../firebase/firebase";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { GetStudentData } from "./getStudentData";

const CourseDetails = () => {
  //course id
  const { id } = useParams();
  const [data, setData] = useState([]);
  // let students = useSelector((state) => state.studentsData.students);
  const dispatch = useDispatch();

  const studentData=GetStudentData();
  

  const addCourseToEnrolled = async (uid, courseInfo) => {
    const studentRef = doc(firestore, "students", uid);

    try {
      await updateDoc(studentRef, {
        enrolledCourses: arrayUnion(courseInfo),
      });
      console.log("Course added to enrolled successfully");
    } catch (error) {
      console.error("Error adding course to enrolled:", error);
    }
  };

  const handleOnEnroll = () => {
    let newEnroll = {
      cid: id,
      courseName: data.name,
      instructor: data.instructor,
      status:Math.floor(Math.random() * 100) + 1,
      duration:data.duration,
      thumbnail:data.thumbnail
    };
    addCourseToEnrolled(studentData.docId, newEnroll);
  };
  console.log(studentData)

  useEffect(() => {
    fetch(`https://courses-api-fe13.onrender.com/api/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return data ? (
    <div>
      <div className="p-5 flex ">
        <div className="left-part w-full items-center justify-center">
          <h3 className="text-left text-5xl font-semibold w-full flex flex-col">
            {data.name}
          </h3>
          <div className="flex justify-between w-9/12 m-5">
            <p className="font-semibold text-xl">By {data.instructor}</p>
            <p className="font-semibold text-xl">{data.duration}</p>
          </div>
          <img
            src={data.thumbnail}
            height={550}
            width={550}
            className="m-3 ml-32"
          />
          <p className="text-justify w-full items-center px-8">
            {data.description}
          </p>
          <div className="prerequisites">
            <h3 className="text-left text-2xl text-700 mt-5">Prerequisites</h3>
            <ul>
              {data.prerequisites &&
                data.prerequisites.map((str, index) => (
                  <li key={index} className="w-64">
                    {str}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div class="inline-block h-[640px] min-h-[1rem] w-0.5 self-stretch bg-neutral-300 dark:bg-white/10"></div>
        <div className="right-part flex flex-col items-center w-6/12 h-8/12 justify-center text-lg">
          <div className="location flex ">
            <p className="font-bold mr-4">Location</p>
            <p>{data.location}</p>
          </div>
          <div className="status flex">
            <p className="font-bold mr-4">Status: </p>
            <p>{data.status}</p>
          </div>
          <button
            className="bg-black text-white w-40 py-3 rounded-lg mt-8"
            onClick={handleOnEnroll}
          >
            Enroll
          </button>
        </div>
      </div>
      <div className="syllabus">
        {data.syllabus &&
          data.syllabus.map((item) => (
            <div className="mx-7">
              <h1 className="text-left">Week {item.week}:</h1>
              <Accordion
                allowMultiple
                className="bg-slate-800 rounded-md text-white w-8/12 "
              >
                <AccordionItem>
                  <h2>
                    <AccordionButton className="w-11/12">
                      <Box as="span" flex="1" textAlign="left">
                        {item.topic}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>{item.content}</AccordionPanel>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <div>Error Fetching Data</div>
  );
};

export default CourseDetails;
