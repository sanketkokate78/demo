import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import LandingPage from './pages/landingpages/LandingPage';
import UserHome from './pages/UserHome';
import AdminRoutes from './pages/adminpages/AdminRoutes';




// Main routing component that handles all application routes
const RoutesComponent = () => {
  const [token, setToken] = useState(''); // Manage token state here
  const isLoggedIn = !!token || !!localStorage.getItem('authToken'); // Check if user is logged in

  return (
    // Routes container for all route definitions
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {/* Sign In Route with conditional rendering */}
      <Route path="/signin" element={
        isLoggedIn ? <UserHome setToken={setToken} /> : <SignIn setToken={setToken} />
      } />
      
      {/* Register Route - Displays the Register component */}
      <Route path="/register" element={<Register />} />
      <Route path="/Landingpage" element={<LandingPage />} />

      {/* Home Route with conditional content based on auth status */}
      <Route path="/userhome" element={
        <div>
          {isLoggedIn ? 
            // Content for logged-in users
            <UserHome setToken={setToken} />
           : 
           <Navigate to="/Landingpage" /> 
          }
        </div>
      } />

 {/* Admin Routes */}
 {/* <Route path="./pages/adminpages/AdminRoutes.jsx" element={<AdminRoutes token={token} setToken={setToken}/>}/> */}

 <Route path="/admin/*" element={<AdminRoutes token={token} setToken={setToken} />} />

    </Routes>
  );
};

export default RoutesComponent;