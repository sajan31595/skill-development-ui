import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventService from "../../services/EventService";
import 'bootstrap/dist/css/bootstrap.css';
import CourseService from "../../services/CourseService";

const AddEvent = () => {
  const [event, setEvent] = useState({
    eventId: "",
    eventName: "",
    eventType: "",
    eventDescription: "",
    eventDate: "",
    courseId: "",
    courseName: "",
  });
  const [courses, setCourses] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await CourseService.getCourses();
      setCourses(response.data);
      showCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showCourses = (coursesList) => {
    let courses = ``;
    coursesList.forEach(element => {
      courses += `<option value="${element.id}">${element.courseName}</option>`
    });
    document.querySelector('#courseId').innerHTML = courses;
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.name === 'eventName') {
      if (value) {
        e.target.classList.remove('error-class');
        e.target.classList.add('border');
      } else {
        e.target.classList.add('error-class');
        e.target.classList.remove('border');
      }
    }
    setEvent({ ...event, [e.target.name]: value });
  };

  const saveEvent = (e) => {
    e.preventDefault();
    if (event.eventName) {
      EventService.saveEvent(event)
      .then((response) => {
        console.log(response);
        navigate("/events");
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
    setEvent({
      eventId: "",
      eventName: "",
      eventType: "",
      eventDescription: "",
      eventDate: "",
      courseId: "",
      courseName: "",
    });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow-xl border-b" style={{padding: '3%'}}>
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Add Event</h1>
        </div>
        
        <div className="items-center justify-center h-14 w-full my-4">
          <label  className="block text-gray-600 col-sm-2 text-sm font-normal">
            Event Name *
          </label>
          <input
            type="text" style={{width: '30%'}}
            name="eventName"
            value={event.eventName}
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
            name="eventDescription"
            value={event.eventDescription}
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
            name="eventType"
            value={event.eventType}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2  text-sm font-normal">
            Course
          </label>
          <select type="dropdown-item" name="courseId" value={event.courseId} style={{width: '30%'}}
          onChange={(e) => handleChange(e)} className="h-10 w-96 border mt-2 px-2 py-2" id="courseId">
            <option></option>
          </select>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Event Date
          </label>
          <input
            type="date" style={{width: '30%'}}
            name="eventDate"
            value={event.eventDate}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={saveEvent}
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

export default AddEvent;
