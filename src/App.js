import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import Login from './components/login/Login';
import Navbar from './components/layout/Navbar';
import Register from './components/login/Register';
import Users from './components/user/Users';
import AddUser from './components/user/AddUser';
import UpdateUser from './components/user/UpdateUser';
import Todos from './components/todo/Todos';
import AddTodo from './components/todo/AddTodo';
import UpdateTodo from './components/todo/UpdateTodo';
import Courses from './components/courses/Courses';
import AddCourse from './components/courses/AddCourse';
import UpdateCourse from './components/courses/UpdateCourse';
import React from 'react';
import Profile from './pages/Profile';

function App() {
    return (
        <BrowserRouter>
        <Navbar/>
            <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
                <Route path='/' element={<AppLayout />}>
                    <Route index element={<Blank />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/addUser' element={<AddUser />} />
                    <Route path='/editUser/:id' element={<UpdateUser />} />
                    <Route path='/roles' element={<Blank />} />
                    <Route path='/courses' element={<Courses />} />
                    <Route path='/addCourse' element={<AddCourse />} />
                    <Route path='/editCourse/:id' element={<UpdateCourse />} />
                    <Route path='/events' element={<Blank />} />
                    <Route path='/todo' element={<Todos />} />
                    <Route path='/addTodo' element={<AddTodo />} />
                    <Route path='/editTodo/:id' element={<UpdateTodo />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/logout' element={<Blank />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
