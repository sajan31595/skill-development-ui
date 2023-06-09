import { useEffect } from "react";
import { React, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfileService from "../services/ProfileService";
import 'bootstrap/dist/css/bootstrap.css';


const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    id: '',
    username: "",
    email: "",
    age: "",
    phoneNumber: "",
    birthDate: "",
    sex: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    if (e.target.name === 'email') {
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
    setProfile({ ...profile, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProfileService.getProfile();
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[]);

  const updateProfile = (e) => {
    e.preventDefault();
    console.log(profile);
    ProfileService.updateProfile(profile)
      .then((response) => {
        alert('Your Profile has been updated!!!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setProfile({
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
            value={profile.username}
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
            value={profile.email}
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
            value={profile.age}
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
            name="phoneNumber"
            value={profile.phoneNumber}
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
            value={profile.birthDate}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 col-sm-2  text-sm font-normal">
            Sex
          </label>
          <select type="dropdown-item" name="sex" value={profile.sex} 
          onChange={(e) => handleChange(e)} className="h-10 w-96 border mt-2 px-2 py-2">
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>       

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={updateProfile}
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

export default Profile;
