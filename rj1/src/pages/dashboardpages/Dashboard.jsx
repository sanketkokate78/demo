import React from 'react';
import { Outlet } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './sidebar/Sidebar';
import CustomNavbar from './navbar/NavbarDash';
import { useState } from 'react';

const Dashboard = ({ setToken }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closesidebar =()=>{
setIsSidebarVisible(false)
  };

  return (
    <div className="dashboard-container">
      <CustomNavbar 
        setToken={setToken} 
        toggleSidebar={toggleSidebar} 
       
      />
      <Sidebar 
       isSidebarVisible={isSidebarVisible}
        closesidebar={closesidebar}
      />
      <div 
      className={`dashboard-content ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
        <Outlet />
      </div>
      {/* <div className="dashboard-content">
        <Outlet />
      </div> */}
    </div>
  );
};

export default Dashboard;


