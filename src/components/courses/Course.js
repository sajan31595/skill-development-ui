import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Course = ({ course, deleteCourse }) => {
const navigate = useNavigate();

const editCourse = (e, id) => {
e.preventDefault();
navigate(`/editCourse/${id}`);
};

return (
<tr key={course.id}>
              <td className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
              <div className="text-sm text-gray-500">{course.name}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{course.description}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{course.type}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{course.author_id}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{course.group_link}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{course.start_date}</div>
              </td>

              <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
                            <button
                            type="button"
                            className="btn btn-link"
                            onClick={(e, id) => editCourse(e, course.id)}
                            >
                            Edit
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button
                            type="button"
                            className="btn btn-link"
                            onClick={(e, id) => deleteCourse(e, course.id)}
                            >
                            Delete
                            </button>
              </td>

</tr>
);
};

export default Course;
