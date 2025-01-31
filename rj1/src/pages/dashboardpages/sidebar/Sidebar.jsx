import React, { useState } from "react";
import { Nav } from "react-bootstrap";

import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from "../../../assets/logo.png";
import "./SideBar.css";

const Sidebar = ({ isSidebarVisible, closesidebar }) => {
  const [isDriverSectionOpen, setIsDriverSectionOpen] = useState(false);
  const [isVehicleSectionOpen, setIsVehicleSectionOpen] = useState(false);

  const toggleDriverSection = () => {
    setIsDriverSectionOpen(!isDriverSectionOpen);
  };

  return (
    <div
      className={`sidebar ${isSidebarVisible ? "visible" : ""}`}
      onClick={closesidebar}
    >
      {/* <div
  onclick={(e) => e.stopPropagation()}>
    <button className='close-btn' onclick={closesidebar}>bi-chevron-right</button>
</div> */}

      <div onClick={(e) => e.stopPropagation()}>
        <Button
          variant="light"
          className="close-btn "
          style={{ width: "40px", marginLeft: "10px" }}
          onClick={closesidebar}
        >
          <i className="bi-chevron-left"></i>
        </Button>
      </div>

      <img
        src={logo}
        alt="Your Alt Text"
        style={{
          width: "40%",
          height: "auto",
          marginLeft: "20px",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      />

      <Nav className="flex-column ">
        <Nav.Link as={Link} to="/admin/dashboard" className="nav-link">
          <i className="bi bi-house-fill icon-manage"></i>{" "}
          <span>Dashboard</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/dashboard/manageservices"
          className="nav-link"
        >
          <i className="bi bi-table icon-manage"></i>
          <span>Manage Services</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/dashboard/managevehicles"
          className="nav-link"
        >
          <i className="bi bi-car-front-fill icon-manage"></i>
          <span>Manage Vehicles</span>
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/admin/dashboard/managebookings"
          className="nav-link"
        >
          <i className="bi bi-journal-check icon-manage"></i>
          <span>Manage Bookings</span>
        </Nav.Link>

        {/* Collapsible Driver Section */}
        <div className="nav-link change" onClick={toggleDriverSection}>
          <i className="bi bi-person icon-manage"></i>
          <span>Manage Driver</span>
          <i
            className={`bi ${
              isDriverSectionOpen ? "bi-chevron-up" : "bi-chevron-down"
            } ms-2`}
          ></i>
        </div>

        {/* Nested Driver Links */}
        {isDriverSectionOpen && (
          <ul>
          <div className="collapsible-section">
            <Nav.Link
              as={Link}
              to="/admin/dashboard/manage-driver/driver-list"
              className="nav-link"
            >
              
                <li>Driver List</li>
              
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/dashboard/manage-driver/assign-vehicles-to-drivers"
              className="nav-link"
            >
                <li>
                  Assign Vehicles To Drivers
                </li>
              
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/dashboard/manage-driver/occupied-driver-list"
              className="nav-link"
            >
              
                <li>Driver Availability</li>
              
            </Nav.Link>
          </div>
          </ul>
        )}

        <Nav.Link
          as={Link}
          to="/admin/dashboard/managehelpers"
          className="nav-link"
        >
          {" "}
          <i className="bi bi-people-fill icon-manage"></i>
          <span>Manage Helpers</span>
        </Nav.Link>

        {/* Collapsible Vehicle Section */}
        <div
          className="nav-link change"
          onClick={() => setIsVehicleSectionOpen(!isVehicleSectionOpen)}
        >
          <i className="bi bi-car-front-fill icon-manage"></i>
          <span>Manage Vehiclesss</span>
          <i
            className={`bi ${
              isVehicleSectionOpen ? "bi-chevron-up" : "bi-chevron-down"
            } ms-2`}
          ></i>
        </div>

        {isVehicleSectionOpen && (
          <div className="collapsible-section">
            <ul>
            <Nav.Link
              as={Link}
              to="/admin/dashboard/manage-vehicles/vehicle-types"
              className="nav-link"
            >
              {/* <i className="bi bi-record-fill mx-3"></i>
              <span>Vehicle Types</span> */}
              <li>Vehicle Types</li>
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/dashboard/manage-vehicles/vehicles"
              className="nav-link"
            >
              {/* <i className="bi bi-record-fill mx-3"></i>
              <span>Vehicles</span> */}
              <li>Vehicles</li>
            </Nav.Link>
            </ul>
          </div>
        )}

        <Nav.Link as={Link} to="/admin/dashboard" className="nav-link">
          <i className="bi bi-tags icon-manage"></i>
          <span>Offers / Promocode</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/dashboard" className="nav-link">
          <i className="bi bi-bell-fill icon-manage"></i>
          <span>Manage Notifications</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/dashboard" className="nav-link">
          <i className="bi bi-journal-check icon-manage"></i>
          <span>Manage Contents</span>
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/dashboard" className="nav-link">
          <i className="bi bi-gear icon-manage"></i>{" "}
          <span>Manage Admin Settings</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
