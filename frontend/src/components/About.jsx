// Zephaniah Gustafson and Koushik Shaganti
import React, { useEffect, useState } from "react";

const About = () => {
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const data = {
      courseName: "Construction of User Interfaces, Spring 2025",
      date: "02/28/2025",
      students: [
        { name: "Zephaniah Gustafson", email: "zevang@iastate.edu" },
        { name: "Koushik Goud Shaganti", email: "koushik9@iastate.edu" },
      ],
    };
    setCourseData(data);
  }, []);

  return (
    <div className='flex flex-col items-center mt-10'>
      <div className='text-center'>
        <h1 style={{ color: "rgb(0, 0, 0)" }}>
          <strong>About Authors</strong>
        </h1>
        {courseData && (
          <>
            <ul id='student-list'>
              {courseData.students.map((student, index) => (
                <li key={index}>
                  {student.name} - {student.email}
                </li>
              ))}
            </ul>
            <br />
            <p>
              <strong>Course Name: </strong>
              {courseData.courseName}
            </p>
            <p>
              <strong>Date: </strong>
              {courseData.date}
            </p>
            <br />
          </>
        )}
      </div>

      <div className='mt-8'>
        <a href='./index.html'>
          <button
            className='px-4 py-2 rounded'
            style={{ backgroundColor: "blue", color: "white" }}>
            Back to home
          </button>
        </a>
      </div>
    </div>
  );
};

export default About;
