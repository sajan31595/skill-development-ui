import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './sidebar.scss';
import '../login/login.css'
import 'bootstrap/dist/css/bootstrap.css';
import Alert from '../layout/Alert';
import React from 'react';

const pageMapping = new Map([
    ['addUser','users'],
    ['editUser', 'users'],
    ['users', 'users'],
    ['roles', 'roles'],
    ['courses', 'courses'],
    ['addCourse', 'courses'],
    ['editCourse', 'courses'],
    ['events', 'events'],
    ['todo', 'todo'],
    ['addTodo', 'todo'],
    ['editTodo', 'todo'],
    ['profile', 'profile'],
    ['logout','logout']
])
let sidebarNavItems = [
    {
        display: 'Users',
        icon: <i className='bx bx-user'></i>,
        to: '/users',
        section: 'users',
        isAdminRole: false
    }, {
        display: 'Roles',
        icon: <i className='bx bx-group'></i>,
        to: '/roles',
        section: 'roles',
        isAdminRole: false
    }, {
        display: 'Courses',
        icon: <i className='bx bx-book-open'></i>,
        to: '/courses',
        section: 'courses',
        isAdminRole: true
    }, {
        display: 'Events',
        icon: <i className='bx bx-calendar'></i>,
        to: '/events',
        section: 'events',
        isAdminRole: true
    }, {
        display: 'Todo',
        icon: <i className='bx bx-message-check'></i>,
        to: '/todo',
        section: 'todo',
        isAdminRole: true
    }, {
        display: 'My Profile',
        icon: <i className='bx bx-smile'></i>,
        to: '/profile',
        section: 'profile',
        isAdminRole: true
    }, {
        display: 'Logout',
        icon: <i className='bx bx-log-out'></i>,
        to: '/logout',
        section: 'logout',
        isAdminRole: true
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        const profileData = JSON.parse(sessionStorage.getItem('profileData')) || {};
        const roles = profileData.roles;
        if (!roles.includes('ADMIN')) {
            sidebarNavItems = sidebarNavItems.filter(item => item.isAdminRole);
        }
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        if(window.location.pathname.split('/')[1] === 'logout'){
            logout()
        }else{
        const curPath = pageMapping.get(window.location.pathname.split('/')[1]);
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
        }
    }, [location]);

    function logout() {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('profileData');
        navigate('/login');
      }

    return <div className='sidebar'>
        <div className="sidebar__logo">
            TEACH EASY
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                    <Link to={item.to} key={index}>
                        <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="sidebar__menu__item__icon">
                                {item.icon}
                            </div>
                            <div className="sidebar__menu__item__text">
                                {item.display}
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;
