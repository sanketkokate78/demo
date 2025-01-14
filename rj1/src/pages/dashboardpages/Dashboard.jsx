
// src/pages/dashboardpages/Dashboard.jsx
// import React, { useState } from 'react';
// import './Dashboard.css'
// import Sidebar from './sidebar/Sidebar';
// import CustomNavbar from './navbar/NavbarDash';
// import ManageServices from './manageservice/ManageServices'; 
// import ManageVehicles from './managevehicle/ManageVehicles';
// import ManageBookings from './managebookings/ManageBookings';
// import Driverlist from './managedrivers/Driverlist';




// const Dashboard = () => {
//   const [token, setToken] = useState('');
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [activeComponent, setActiveComponent] = useState('dashboard'); 

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'ManageServices':
//         return <ManageServices />;
//       case 'ManageVehicles':
//         return <ManageVehicles />;
//         case 'ManageBookings':
//         return <ManageBookings />;
//         case 'Driverlist':
//           return <Driverlist />;
//       default:
//         return <h1>Dashboard Content</h1>; // Default dashboard content
//     }
//   };

//   return (
//     <div className="dashboard-container">
//       <CustomNavbar setToken={setToken} setSidebarCollapsed={setSidebarCollapsed}/>
//       <Sidebar setSidebarCollapsed={setSidebarCollapsed} activeComponent={activeComponent} setActiveComponent={setActiveComponent} /> 

//       <div className={`dashboard-content ${sidebarCollapsed ? 'expanded' : ''}`}>
//         {renderComponent()} {/* Render the active component here */}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import { Outlet } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './sidebar/Sidebar';
import CustomNavbar from './navbar/NavbarDash';
import { useState } from 'react';

const Dashboard = ({ setToken }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="dashboard-container">
      <CustomNavbar setToken={setToken} setSidebarCollapsed={setSidebarCollapsed} />
      <Sidebar setSidebarCollapsed={setSidebarCollapsed} />

      <div className={`dashboard-content ${sidebarCollapsed ? 'expanded' : ''}`}>
        <Outlet /> {/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default Dashboard;