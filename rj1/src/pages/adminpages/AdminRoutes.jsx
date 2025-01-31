import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminSignIn from "./AdminSignIn";
import Dashboard from "../dashboardpages/Dashboard";
import ManageServices from "../dashboardpages/manageservice/ManageServices";
import ManageVehicles from "../dashboardpages/managevehicle/ManageVehicles";
import ManageBookings from "../dashboardpages/managebookings/ManageBookings";
import Driverlist from "../dashboardpages/managedrivers/Driverlist";
import VehiclesTypes from "../dashboardpages/managevehicle/VehiclesTypes";
import Vehicles from "../dashboardpages/managevehicle/Vehicles";
import Driverdetails from "../dashboardpages/managedrivers/Driverdetails";
import Assigndriver from "../dashboardpages/managedrivers/Assigndriver";

const AdminRoutes = ({ token, setToken }) => {
  const isLoggedIn = !!token || !!localStorage.getItem("authToken"); // Check if admin is logged in

  return (
    <Routes>
      {/* Admin Sign In Route */}
      <Route path="signin" element={<AdminSignIn setToken={setToken} />} />

      {/* Admin Dashboard Route */}
      <Route
        path="dashboard"
        element={
          isLoggedIn ? (
            <Dashboard setToken={setToken} />
          ) : (
            <Navigate to="/admin/signin" />
          )
        }
      >
        {/* Nested Routes for Dashboard */}
        <Route index element={<h1>Dashboard Content</h1>} />{" "}
        {/* Default content for /admin/dashboard */}
        <Route path="manageservices" element={<ManageServices />} />
        <Route path="managevehicles" element={<ManageVehicles />} />
        <Route path="managebookings" element={<ManageBookings />} />
        <Route path="manage-driver/driver-list" element={<Driverlist />} />
        <Route
          path="manage-driver/assign-vehicles-to-drivers"
          element={<Assigndriver />}
        />
        <Route
          path="manage-vehicles/vehicle-types"
          element={<VehiclesTypes />}
        />
        <Route path="manage-vehicles/vehicles" element={<Vehicles />} />
        <Route
          path="manage-driver/driver-details/:id"
          element={<Driverdetails />}
        />
      </Route>

      {/* Redirect to signin if no matching route */}
      {/* <Route path="*" element={<Navigate to="/admin/signin" />} /> */}
    </Routes>
  );
};

export default AdminRoutes;
