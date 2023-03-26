import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import User from "./User";
import 'bootstrap/dist/css/bootstrap.css';

const Users = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getUsers();
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const deleteUser = (e, id) => {
    e.preventDefault();
    UserService.deleteUser(id).then((res) => {
      if (users) {
        setUsers((prevElement) => {
          return prevElement.filter((user) => user.id !== id);
        });
      }
    });
  };

  return (
    <div className="container mx-auto my-8">
      <div className="user">
        <button
          onClick={() => navigate("/addUser")}
          className="btn btn-primary btn-block"
        >
          Add User
        </button>
      </div>
      <div className="usertable ">
        <table class="table table-hover">
          <thead className="bg-gray-300">
            <tr>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                User Name
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Age
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Phone
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Date of Birth
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Sex
              </th>
              <th className="text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Email ID
              </th>
              <th className="text-center font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                Actions
              </th>
            </tr>
          </thead>

          {!loading && (
            <tbody className="bg-white">
              {users.map((user) => (
                <User
                  user={user}
                  deleteUser={deleteUser}
                  key={user.id}
                ></User>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Users;
