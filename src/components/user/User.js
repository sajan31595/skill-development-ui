import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

const User = ({ user, deleteUser }) => {
const navigate = useNavigate();

const editUser = (e, id) => {
e.preventDefault();
navigate(`/editUser/${id}`);
};

return (
<tr key={user.id}>
              <td className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
              <div className="text-sm text-gray-500">{user.username}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{user.age}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{user.phone}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{user.birthDate}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{user.sex}</div>
              </td>
              <td className="text-left px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-500">{user.email}</div>
              </td>

              <td className="text-right px-6 py-4 whitespace-nowrap font-medium text-sm">
                            <button
                            type="button"
                            className="btn btn-link"
                            onClick={(e, id) => editUser(e, user.id)}
                            >
                            Edit
                            </button>
                            &nbsp;&nbsp;&nbsp;
                            <button
                            type="button"
                            className="btn btn-link"
                            onClick={(e, id) => deleteUser(e, user.id)}
                            >
                            Delete
                            </button>
              </td>

</tr>
);
};

export default User;
