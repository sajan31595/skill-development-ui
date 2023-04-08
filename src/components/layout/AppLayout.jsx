import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import React from 'react';

const AppLayout = () => {
    return <div style={{
        padding: '0 0 0 22%'
    }}>
        <Sidebar />
        <Outlet />
    </div>;
};

export default AppLayout;
