import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";

const Assigndriver = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [assignedDrivers, setAssignedDrivers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState({});
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleName, setVehicleName] = useState("");

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/driver_list");
        setDrivers(response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    const fetchAssignedDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/assigndriver");
        setAssignedDrivers(response.data);
      } catch (error) {
        console.error("Error fetching assigned drivers:", error);
      }
    };

    fetchDrivers();
    fetchAssignedDrivers();
  }, []);

  const handleShowModal = async (driver) => {
    setSelectedDriver(driver);
    setShowModal(true);
    await fetchVehicles(); // Fetch vehicles when modal is shown
  };

  const fetchVehicles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vehicle_list");
      setVehicles(response.data);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  const handleSaveVehicle = async () => {
    // Check if the selected vehicle is already assigned to another driver
    const isVehicleAssigned = assignedDrivers.some(
      (assignment) =>
        assignment.vehicle_name === vehicleName &&
        assignment.vehicle_type === vehicleType
    );

    if (isVehicleAssigned) {
      alert("This vehicle is already assigned to another driver.");
      return; // Exit the function without saving
    }

    // Check if the selected driver already has an assigned vehicle
    const isDriverAssigned = assignedDrivers.some(
      (assignment) => assignment.driver_id === selectedDriver.driver_id
    );

    if (isDriverAssigned) {
      alert("This driver is already assigned with a vehicle.");
      return; // Exit the function without saving
    }

    try {
      await axios.post("http://localhost:5000/assigndriver", {
        driver_id: selectedDriver.driver_id,
        vehicle_type: vehicleType,
        vehicle_name: vehicleName,
      });
      setShowModal(false);
      // Refresh assigned drivers after saving
      const response = await axios.get("http://localhost:5000/assigndriver");
      setAssignedDrivers(response.data);
    } catch (error) {
      console.error("Error saving vehicle assignment:", error);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <h4 className="py-3 mb-0">
        <span className="text-muted fw-light">Dashboard /</span> Assign Vehicles
        To Drivers
      </h4>

      <div className="row">
        <div className="col-lg-12 order-0 mb-4">
          <div className="card">
            <div className="card-datatable text-nowrap px-3 py-2">
              <table className="table table-striped table-bordered dataTable no-footer table-responsive dataTables_wrapper dt-bootstrap5">
                <thead>
                  <tr>
                    <th>Profile ID</th>
                    <th>Profile</th>
                    <th>Contacts</th>
                    <th>Vehicle Type / Vehicle Name</th>
                    <th>Status</th>
                    <th>Is Verified</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {drivers
                    .filter((driver) => driver.is_vehicle === "No")
                    .map((driver) => (
                      <tr key={driver.driver_id}>
                        <td>{driver.driver_id}</td>
                        <td>
                          <img
                            src={`http://localhost:5000${driver.driver_image}`}
                            alt={driver.driver_name}
                            width="50"
                          />
                          <span>{driver.driver_name}</span>
                        </td>
                        <td>
                          {driver.driver_email} <br />
                          <span>{driver.driver_mobile}</span>
                        </td>
                        <td>
                          {assignedDrivers.length > 0 &&
                            assignedDrivers
                              .filter(
                                (assignment) =>
                                  assignment.driver_id === driver.driver_id
                              )
                              .map(
                                (assignment) =>
                                  `${assignment.vehicle_type} / ${assignment.vehicle_name}`
                              )
                              .join(" ; ")}
                        </td>
                        <td>
                          {driver.status === "Active" ? (
                            <span className="status-active">Active</span>
                          ) : (
                            <span className="status-inactive">Inactive</span>
                          )}
                        </td>
                        <td>
                          {driver.is_verified === "Yes" ? (
                            <span className="status-active">Yes</span>
                          ) : (
                            <span className="status-inactive">No</span>
                          )}
                        </td>
                        <td>
                          <span onClick={() => handleShowModal(driver)}>
                            <i className="bi bi-car-front me-1 fs-4"></i>
                          </span>
                          <span>
                            <Link
                              to={`/admin/dashboard/manage-driver/driver-details/${driver.driver_id}`}
                            >
                              <i
                                className="bi bi-eye"
                                style={{
                                  cursor: "pointer",
                                  fontSize: "1.5rem",
                                }}
                              ></i>
                            </Link>
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Vehicle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Select Vehicle Type</Form.Label>
            <Form.Control
              as="select"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="">Choose...</option>
              {Array.from(new Set(vehicles.map((v) => v.vehicle_type))).map(
                (
                  type // Get unique vehicle types
                ) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              )}
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Select Vehicle Name</Form.Label>
            <Form.Control
              as="select"
              value={vehicleName}
              onChange={(e) => setVehicleName(e.target.value)}
            >
              <option value="">Choose...</option>
              {vehicles
                .filter((vehicle) => vehicle.vehicle_type === vehicleType) // Filter by selected vehicle type
                .map((vehicle) => (
                  <option key={vehicle.vehicle_id} value={vehicle.vehicle_name}>
                    {vehicle.vehicle_name}
                  </option>
                ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveVehicle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Assigndriver;
