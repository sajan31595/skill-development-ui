import { useEffect } from "react";
import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import 'bootstrap/dist/css/bootstrap.css';


const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: id,
    firstName: "",
    lastName: "",
    email: "",
    dept: "",
    address: "",
    salary: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserService.getUserById(user.id);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[user.id]);

  const updateUser = (e) => {
    e.preventDefault();
    console.log(user);
    UserService.updateUser(user, id)
      .then((response) => {
        console.log(response);
        navigate("/users");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex max-w-2xl mx-auto shadow-xl border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Update User</h1>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Department
          </label>
          <input
            type="text"
            name="dept"
            value={user.dept}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={updateUser}
            className=" btn-primary btn  font-semibold bg-green-400 hover:bg-green-800 py-2 px-6"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/users")}
            className=" btn-primary btn font-semibold bg-red-400 hover:bg-red-700 cancel py-2 px-6"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
