import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const Event = ({ event, deleteEvent }) => {
const navigate = useNavigate();

const editEvent = (e, id) => {
e.preventDefault();
navigate(`/editEvent/${id}`);
};

return (
<tr key={event.eventId}>
              <td className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
              <div className="text-sm text-gray-500">{event.eventName}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{event.eventType}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{event.eventDescription}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{event.eventDate}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{event.courseId}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{event.courseName}</div>
              </td>

              <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
                            <button
                            type="button"
                            className="btn btn-link"
                            onClick={(e, id) => editEvent(e, event.eventId)}
                            >
                            Edit
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button
                            type="button"
                            className="btn btn-link"
                            onClick={(e, id) => deleteEvent(e, event.eventId)}
                            >
                            Delete
                            </button>
              </td>

</tr>
);
};

export default Course;
