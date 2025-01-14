import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'


const SignIn = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { email, password };

    axios
      .post('http://localhost:5000/signin', userData)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        setToken(token); // This should now work correctly
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
                <h2 className="fs-7 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          required
                        />
                        <label htmlFor="email" className="form-label">Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          required
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid my-3">
                        <button className="btn btn-primary btn-lg" type="submit">Log in</button>
                      </div>
                    </div>
                    <div className="col-12">
                      <p className="m-0 text-secondary text-center">Don't have an account? <Link to="/register" className="link-primary text-decoration-none">Sign up</Link></p>
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
  






    // <div className="container mt-5">
    //   <h2>Sign In</h2>
    //   <form onSubmit={handleSubmit} className="form-group">
    //     <input
    //       type="email"
    //       className="form-control mb-2"
    //       placeholder="Email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />
    //     <input
    //       type="password"
    //       className="form-control mb-2"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />
    //     <button type="submit" className="btn btn-primary">Sign In</button>
    //   </form>
    //   {message && <p className="text-danger">{message}</p>}
    //   <p className="mt-3">Don't have an account? <Link to="/register">Register</Link></p>
    // </div>
  );
};

export default SignIn;