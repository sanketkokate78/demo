import React from 'react'

const UserHome = ({ setToken }) =>{

  return (
    <div>
     
      <h1>Welcome!</h1>
              <button onClick={() =>{
                // Logout: Remove token and refresh page
                setToken(''); // Clear token state
                localStorage.removeItem('authToken');
                window.location.reload();
              }}>Logout</button>
    </div>
  );
};

export default UserHome;