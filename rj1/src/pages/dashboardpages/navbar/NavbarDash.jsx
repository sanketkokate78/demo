import React, { useState } from "react";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Navbardash.css";
import image from "../../../assets/image.png";

const CustomNavbar = ({ setToken, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(""); // Clear token state
    localStorage.removeItem("authToken"); // Remove token from local storage
    navigate("/admin/signin"); // Redirect to signin page
  };

  return (
    <>
      <Navbar expand="lg" className="shadow-sm  newnav ">
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={toggleSidebar}
          />
          <Nav className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                id="dropdown-basic"
                className="navbar-logo"
              >
                <img
                  src={image}
                  alt="profile image"
                  className="profile-image"
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">
                  Settings
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
