// import React from "react";
// import { Routes,Route,Navigate } from "react-router-dom";
// import AdminSignIn from "./AdminSignIn";
// import AdminPanel from "./AdminPanel";

// import Dashboard from "../dashboardpages/Dashboard";
// import ManageServices from "../dashboardpages/manageservice/ManageServices";
// import ManageVehicles from "../dashboardpages/managevehicle/ManageVehicles";
// import ManageBookings from "../dashboardpages/managebookings/ManageBookings";
// import Driverlist from "../dashboardpages/managedrivers/Driverlist";

// const AdminRoutes = ({ token, setToken }) => {
//     const isLoggedIn = !!token || !!localStorage.getItem('authToken'); // Check if admin is logged in
  
//     return (

//         <Routes>
//         {/* Admin Sign In Route */}
//         <Route path="signin" element={<AdminSignIn setToken={setToken} />} />
        
//         {/* Admin Panel Route */}
//         <Route path="Dashboard" element={
//           isLoggedIn ? <Dashboard setToken={setToken}/> : <Navigate to="/admin/signin" />
//         } />



// {/* <Route path="../dashboardpages/Dashboard.jsx" element={<Dashboard/>} /> */}

// <Route path="dashboard" element={<Dashboard />} />
// <Route path="ManageServices" element={<ManageServices/>} />
// {/* <Route path="ManageVehicles" element={<ManageVehicles/>} /> */}
// <Route path="ManageBookings" element={<ManageBookings/>}
//   />
// <Route path="Driverlist" element={Driverlist}/>

//       </Routes>

//     );
//   };
  
//   export default AdminRoutes;





import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSignIn from "./AdminSignIn";
import Dashboard from "../dashboardpages/Dashboard";
import ManageServices from "../dashboardpages/manageservice/ManageServices";
import ManageVehicles from "../dashboardpages/managevehicle/ManageVehicles";
import ManageBookings from "../dashboardpages/managebookings/ManageBookings";
import Driverlist from "../dashboardpages/managedrivers/Driverlist";

const AdminRoutes = ({ token, setToken }) => {
  const isLoggedIn = !!token || !!localStorage.getItem('authToken'); // Check if admin is logged in

  return (
    <Routes>
      {/* Admin Sign In Route */}
      <Route path="signin" element={<AdminSignIn setToken={setToken} />} />

      {/* Admin Dashboard Route */}
      <Route path="dashboard" element={isLoggedIn ? <Dashboard setToken={setToken} /> : <Navigate to="/admin/signin" />}>
        {/* Nested Routes for Dashboard */}
        <Route index element={<h1>Dashboard Content</h1>} /> {/* Default content for /admin/dashboard */}
        <Route path="manageservices" element={<ManageServices />} />
        <Route path="managevehicles" element={<ManageVehicles />} />
        <Route path="managebookings" element={<ManageBookings />} />
        <Route path="driverlist" element={<Driverlist />} />
      </Route>

      {/* Redirect to signin if no matching route */}
      <Route path="*" element={<Navigate to="/admin/signin" />} />
    </Routes>
  );
};

export default AdminRoutes;