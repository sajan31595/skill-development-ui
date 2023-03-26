import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import 'bootstrap/dist/css/bootstrap.css';

const AddUser = () => {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    dept: "",
    address: "",
    salary: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();
    UserService.saveUser(user)
      .then((response) => {
        console.log(response);
        navigate("/users");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setUser({
      id: "",
      firstName: "",
      lastName: "",
      dept: "",
      address: "",
      salary: "",
      email: "",
    });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow-xl border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Add New User</h1>
        </div>
        
        <div className="items-center justify-center h-14 w-full my-4">
          <label  className="block text-gray-600 col-sm-2 text-sm font-normal">
            User Name
          </label>
          <input
            type="text"
            name="firstName"
            value={user.username}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border  mt-2 px-2 py-2"
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

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Age
          </label>
          <input
            type="number"
            name="age"
            value={user.age}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600  col-sm-2 text-sm font-normal">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Date of Birth
          </label>
          <input
            type="date"
            name="birthDate"
            value={user.birthDate}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2  text-sm font-normal">
            Sex
          </label>
          <input
            type="dropdown-item"
            name="sex"
            value={user.sex}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>       

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={saveUser}
            className="btn-primary btn  text-white font-semibold bg-green-400 hover:bg-green-800 py-2 px-6"
          >
            Save
          </button>
          <button
            onClick={reset}
            className="btn-primary btn  text-white font-semibold  cancel bg-red-400 hover:bg-red-700 py-2 px-6"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
