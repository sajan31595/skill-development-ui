import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Navigate} from "react-router";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="login">
      <div className="fflex max-w-2xl mx-auto shadow-xl border-b ">
        <div className="px-8 py-8">
          <div className=" font-thin text-2xl font-bold text-black tracking-wider">
            <h1>Admin Registeration</h1>
          </div>

          <div className="form-group">
            <label>
              Name
            </label>
            <input
              type="text"
              name="register_name"
              //             value={employee.firstName}
              // onChange={(e) => handleChange(e)}
              className="form-control"
            ></input>
          </div>

          <div className="form-group">
            <label >
              Email
            </label>
            <input
              type="email"
              name="register_email"
              //             value={employee.lastName}
              // onChange={(e) => handleChange(e)}
              className="form-control"
            ></input>
          </div>

          <div className="form-group">
            <label>
              Id number
            </label>
            <input
              type="text"
              name="register_id"
              //             value={employee.firstName}
              // onChange={(e) => handleChange(e)}
              className="form-control"
            ></input>
          </div>

          <div className="form-group">
            <label >
              Set password
            </label>
            <input
              type="password"
              name="register_password"
              //             value={employee.firstName}
              // onChange={(e) => handleChange(e)}
              className="form-control"
            ></input>
          </div>


          <div className="form-group">
            <button
              //             onClick={saveEmployee}
              className="btn btn-primary btn-block"
            >
              Register
            </button>
            <button
                  onClick={()=>navigate("/login")}
              className="btn btn-primary btn-block"
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
