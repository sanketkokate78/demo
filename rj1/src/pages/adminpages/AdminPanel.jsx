import React from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../dashboardpages/Dashboard";

const AdminPanel = ({ setToken }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const goToDashboard = () => {
    navigate("/admin/dashboard"); // Replace '/dashboard' with the actual path to your Dashboard component
  };

  return (
    <div>
      <h1>Welcome to the admin panel!</h1>
      <button onClick={goToDashboard}>Go to Dashboard</button>
      <button
        onClick={() => {
          // Logout: Remove token and refresh page
          setToken(""); // Clear token state
          localStorage.removeItem("authToken");
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
