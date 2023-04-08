import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/CourseService";
import 'bootstrap/dist/css/bootstrap.css';

const AddCourse = () => {
  const [course, setCourse] = useState({
    courseName: "",
    description: "",
    type: "",
    author_id: 1,
    created_by: 0,
    group_link: "1",
    start_date: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.name === 'courseName') {
      if (value) {
        e.target.classList.remove('error-class');
        e.target.classList.add('border');
      } else {
        e.target.classList.add('error-class');
        e.target.classList.remove('border');
      }
    }
    setCourse({ ...course, [e.target.name]: value });
  };

  const saveCourse = (e) => {
    e.preventDefault();
    if (course.courseName) {
      CourseService.saveCourse(course)
      .then((response) => {
        console.log(response);
        navigate("/courses");
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      alert("Please enter valid details!!!");
    }
  };

  const reset = (e) => {
    e.preventDefault();
    setCourse({
      name: "",
      description: "",
      type: "",
      author_id: 1,
      created_by: 0,
      group_link: "1",
      start_date: "",
    });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow-xl border-b" style={{padding: '3%'}}>
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Add Course</h1>
        </div>
        
        <div className="items-center justify-center h-14 w-full my-4">
          <label  className="block text-gray-600 col-sm-2 text-sm font-normal">
            Course Name *
          </label>
          <input
            type="text" style={{width: '30%'}}
            name="courseName"
            value={course.courseName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border  mt-2 px-2 py-2"
          ></input>
        </div>

        <div style={{display: 'flex'}}>
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Description
          </label>
          <textarea
            style={{width: '30%'}}
            name="description"
            value={course.description}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></textarea>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Type
          </label>
          <input
            type="text" style={{width: '30%'}}
            name="type"
            value={course.type}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Start Date
          </label>
          <input
            type="date" style={{width: '30%'}}
            name="start_date"
            value={course.start_date}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={saveCourse}
            className="btn-secondary btn  text-white font-semibold bg-green-400 hover:bg-green-800 py-2 px-6"
          >
            Save
          </button>
          <button
            onClick={reset}
            className="btn-secondary btn  text-white font-semibold  cancel bg-red-400 hover:bg-red-700 py-2 px-6"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
