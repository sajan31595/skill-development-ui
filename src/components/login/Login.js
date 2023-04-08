import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";
import './login.css'
import 'bootstrap/dist/css/bootstrap.css';


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {

  const [loginDetail, setloginDetail] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const form = useRef();
  const navigate = useNavigate();

  const handleChange = (e, field) => {
    let actualValue = e.target.value;
    setloginDetail({ ...loginDetail, [field]: actualValue });
  };

  const handleSubmitForm = (e) => {
    if (
      loginDetail.username.trim() === "" ||
      loginDetail.password.trim() === ""
    ) {
      alert("Enter valid username and password");
      return;
    }

    UserService.loginUser(loginDetail).then((response) => {
      sessionStorage.setItem('profileData', JSON.stringify(response.data));
      const roles = response.data?.roles;
      if (roles.includes('ADMIN')) {
        navigate("/users");
      } else {
        navigate("/courses");
      }
    }).catch(error => {
      console.log(error);
      if (error.response.status === 400 || error.response.status === 404)
        console.log(error.response.data.message);
      else
        console.log("Something went wrong on server!");
    });

  };

  const registerUser = () => {
    navigate("/register")
  };




  return (
    <div >
      <div className="login">
        <div className="flex max-w-2xl mx-auto shadow-xl border-b">
          <div className="px-8 py-8">
            <div className="font-thin text-2xl font-bold text-black tracking-wider">
              <h2 id="headerTitle">TEACH EASY</h2>
            </div>
            <div className="form-group">
              <input
                type="text"
                id="username" placeholder="User Name"
                value={loginDetail.username}
                onChange={(e) => handleChange(e, "username")}
                className="form-control"
                validations={[required]}
              ></input>
            </div>

            <div className="form-group">
              <input
                type="password" placeholder="Password"
                id="password"
                value={loginDetail.password}
                onChange={(e) => handleChange(e, "password")}
                className="form-control"
                validations={[required]}
              ></input>
            </div>

            <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
              <button
                onClick={handleSubmitForm}
                className="btn btn-secondary btn-block"
              >
                Login
              </button>
            </div>
            <div>
              <button
                onClick={registerUser}
                className="btn btn-secondary btn-block"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
