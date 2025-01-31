import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/register', formData);
      navigate('/signin');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (


<section className="bg-light py-3 py-md-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
            <div className="card border border-light-subtle rounded-3 shadow-sm">
              <div className="card-body p-3 p-md-4 p-xl-5">
              <div className="text-center mb-3">
              <a href="#!">
              <img src={logo} alt="courier Logo" width="170" height="70" />
                  </a>
                </div>
                <h1 className="fs-7 fw-normal text-center text-secondary mb-4">Creat an account</h1>
                <form onSubmit={handleSubmit}>
                  <div className="row gy-2 overflow-hidden">
                    <div className="col-12">
                      <div className="form-floating mb-1">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="name" className="form-label">Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-1">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="email" className="form-label">Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating mb-1">
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="password" className="form-label">Password</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="d-grid my-2">
                        <button className="btn btn-primary btn-lg" type="submit">Register</button>
                      </div>
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <div className="col-12">
                      <p className="m-0 text-secondary text-center">Already have an account? <Link to="/signin" className="link-primary text-decoration-none">Sign In</Link></p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};

export default Register;