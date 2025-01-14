import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'


const AdminSignIn = ({ setToken }) => {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const adminData = { admin_username: username, admin_password: password};

    axios
      .post('http://localhost:5000/admin/signin', adminData)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        setToken(token); // Set token for admin
        navigate('/admin/dashboard'); // Redirect to admin panel
      })
      .catch((error) => {
        setMessage(error.response?.data?.message || 'Error signing in');
      });
  };

  return (
  <section className="bg-light py-3 py-md-5" style={{ minHeight: '100vh' }}>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
        <div className="card border border-light-subtle rounded-3 shadow-sm">
          <div className="card-body p-3 p-md-4 p-xl-5">
            <div className="text-center mb-4">
              <a href="#!">
                <img src={logo} alt="courier Logo" width="170" height="70" />
              </a>
            </div>
            <h2 className="fs-7 fw-normal text-center text-secondary mb-4">Sign in to your Admin ac</h2>
            <form onSubmit={handleSubmit}>
              <div className="row gy-2 overflow-hidden">
                <div className="col-12">
                  <div className="form-floating mb-3">
                  <input
          type="text"
          className="form-control"
          placeholder="username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          required
        />
                    <label htmlFor="text" className="form-label">UserName</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-floating mb-3">
                  <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
                    <label htmlFor="password" className="form-label">Password</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-grid my-3">
                    <button className="btn btn-primary btn-lg" type="submit">sign in</button>
                  </div>
                </div>
               
              </div>
            </form>
            {message && <p className="text-danger">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );










  //   <div>
  //     <h2>Admin Sign In</h2>
  //     <form onSubmit={handleSubmit}>
  //       <input
  //         type="text"
  //         placeholder="username"
  //         value={username}
  //         onChange={(e) => setusername(e.target.value)}
  //         required
  //       />
  //       <input
  //         type="password"
  //         placeholder="Password"
  //         value={password}
  //         onChange={(e) => setPassword(e.target.value)}
  //         required
  //       />
  //       <button type="submit">Log in</button>
  //     </form>
  //     {message && <p>{message}</p>}
  //   </div>
  // );
};

export default AdminSignIn;