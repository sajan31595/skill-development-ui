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
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    age: "",
    phoneNumber: "",
    birthDate: "",
    sex: ""
  });

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

  const reset = (e) => {
    e.preventDefault();
    setUser({
      username: "",
    email: "",
    age: "",
    phoneNumber: "",
    birthDate: "",
    sex: "MALE"
    });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow-xl border-b" style={{padding: '3%'}}>
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>Update User</h1>
        </div>
        
        <div className="items-center justify-center h-14 w-full my-4">
          <label  className="block text-gray-600 col-sm-2 text-sm font-normal">
            User Name *
          </label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border  mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2 text-sm font-normal">
            Email *
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
          <select type="dropdown-item" name="sex" value={user.sex} 
          onChange={(e) => handleChange(e)} className="h-10 w-96 border mt-2 px-2 py-2">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>       

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={updateUser}
            className="btn-secondary btn  text-white font-semibold bg-green-400 hover:bg-green-800 py-2 px-6"
          >
            Update
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

export default UpdateUser;
