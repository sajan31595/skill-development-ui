import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';

const pageMapping = new Map([
    ['addUser','users'],
    ['editUser', 'users'],
    ['users', 'users'],
    ['roles', 'roles'],
    ['courses', 'courses'],
    ['events', 'events'],
    ['todo', 'todo'],
    ['profile', 'profile']
])
const sidebarNavItems = [
    {
        display: 'Users',
        icon: <i className='bx bx-user'></i>,
        to: '/users',
        section: 'users'
    }, {
        display: 'Roles',
        icon: <i className='bx bx-group'></i>,
        to: '/roles',
        section: 'roles'
    }, {
        display: 'Courses',
        icon: <i className='bx bx-book-open'></i>,
        to: '/courses',
        section: 'courses'
    }, {
        display: 'Events',
        icon: <i className='bx bx-calendar'></i>,
        to: '/events',
        section: 'events'
    }, {
        display: 'Todo',
        icon: <i className='bx bx-message-check'></i>,
        to: '/todo',
        section: 'todo'
    }, {
        display: 'My Profile',
        icon: <i className='bx bx-smile'></i>,
        to: '/profile',
        section: 'profile'
    },
]

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = pageMapping.get(window.location.pathname.split('/')[1]);
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }, [location]);

    return <div className='sidebar'>
        <div className="sidebar__logo">
            Upgrade Skill
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
