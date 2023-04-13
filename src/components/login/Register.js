import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate} from "react-router";
import UserService from "../../services/UserService";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    age: "",
    phoneNumber: "",
    birthDate: "",
    sex: "MALE"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.name === 'password') {
      const confirmPassword = document.querySelector("input[name='confirmPassword']");
      if (user.confirmPassword === value) {
        e.target.classList.remove('error-class');
        e.target.classList.add('border');
        confirmPassword.classList.remove('error-class');
        confirmPassword.classList.add('border');
      } else {
        e.target.classList.add('error-class');
        e.target.classList.remove('border');
        confirmPassword.classList.add('error-class');
        confirmPassword.classList.remove('border');
      }
    } else if (e.target.name === 'confirmPassword') {
      const password = document.querySelector("input[name='password']");
      if (user.password === value) {
        e.target.classList.remove('error-class');
        e.target.classList.add('border');
        password.classList.remove('error-class');
        password.classList.add('border');
      } else {
        e.target.classList.add('error-class');
        e.target.classList.remove('border');
        password.classList.add('error-class');
        password.classList.remove('border');
      }
    } else if (e.target.name === 'email') {
      if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
        e.target.classList.remove('error-class');
        e.target.classList.add('border');
      } else {
        e.target.classList.add('error-class');
        e.target.classList.remove('border');
      }
    } else if (e.target.name === 'username') {
      if (value) {
        e.target.classList.remove('error-class');
        e.target.classList.add('border');
      } else {
        e.target.classList.add('error-class');
        e.target.classList.remove('border');
      }
    }
    setUser({ ...user, [e.target.name]: value });
  };

  const saveUser = (e) => {
    e.preventDefault();
    if (user.password === user.confirmPassword && user.username &&
      (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
      UserService.registerUser(user)
      .then((response) => {
        console.log(response);
        navigate("/login");
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
    setUser({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    age: "",
    phoneNumber: "",
    birthDate: "",
    sex: "MALE"
    });
  };
  return (
    <div>
      <div className="fflex max-w-2xl mx-auto shadow-xl border-b ">
      <div className="px-8 py-8" style={{margin: '0 0 0 20%'}}>
        <div className="font-thin text-2xl tracking-wider">
          <h1>Add New User</h1>
        </div>
        
        <div className="items-center justify-center h-14 w-full my-4">
          <label  className="block text-gray-600 col-sm-2 text-sm font-normal">
            User Name *
          </label>
          <input
            type="text" style={{width: '30%'}}
            name="username"
            value={user.username}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border  mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label  className="block text-gray-600 col-sm-2 text-sm font-normal">
            Password *
          </label>
          <input
            type="password" style={{width: '30%'}}
            name="password"
            value={user.password}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border  mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label  className="block text-gray-600 col-sm-2 text-sm font-normal">
            Confirm Password *
          </label>
          <input
            type="password" style={{width: '30%'}}
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border  mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Email *
          </label>
          <input
            type="email" style={{width: '30%'}}
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
            type="number" style={{width: '30%'}}
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
            type="text" style={{width: '30%'}}
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Date of Birth
          </label>
          <input
            type="date" style={{width: '30%'}}
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
          <select type="dropdown-item" name="sex" value={user.sex} style={{width: '30%'}}
          onChange={(e) => handleChange(e)} className="h-10 w-96 border mt-2 px-2 py-2">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>       

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={saveUser}
            className="btn-secondary btn  text-white font-semibold bg-green-400 hover:bg-green-800 py-2 px-6"
          >
            Register
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn-secondary btn  text-white font-semibold  cancel bg-red-400 hover:bg-red-700 py-2 px-6"
          >
            Login
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};
export default Register;
