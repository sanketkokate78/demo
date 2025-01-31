import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./Vehiclestypes.css";

const VehiclesTypes = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    base_fare: "",
    charges: "",
    description: "",
    status: "Active",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All"); // Selected status state

  const filteredData = data.filter((item) => {
    const matchesSearchQuery =
      item.vehicle_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vehicle_base_fare
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item.vehicle_charges.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;

    return matchesSearchQuery && matchesStatus;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/vehicle_type"); // Adjust the URL as needed
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file)); // Show preview of the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();

    if (formData.image) {
      newFormData.append("vehicle_image", formData.image);
    } else {
    }

    newFormData.append("vehicle_name", formData.name);
    newFormData.append("vehicle_base_fare", formData.base_fare);
    newFormData.append("vehicle_description", formData.description);
    newFormData.append("vehicle_charges", formData.charges);
    newFormData.append("status", formData.status);

    try {
      if (formData.vehicle_id) {
        // If editing, send a PUT request
        await axios.put(
          `http://localhost:5000/vehicle_type/${formData.vehicle_id}`,
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Check for duplicate entry
        const existingVehicle = data.find(
          (item) =>
            item.vehicle_name.toLowerCase() === formData.name.toLowerCase()
        );
        if (existingVehicle) {
          alert("Vehicle Name already exists!");
          return;
        }

        // If adding, send a POST request
        await axios.post("http://localhost:5000/vehicle_type", newFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchData();

      setFormData({
        image: null,
        name: "",
        base_fare: "",
        description: "",
        charges: "",
        status: "Active",
      });
      setImagePreview(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/vehicle_type/${id}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting the service:", error);
      }
    }
  };

  const handleEdit = (item) => {
    setFormData({
      vehicle_id: item.vehicle_id,
      image: null,
      name: item.vehicle_name,
      base_fare: item.vehicle_base_fare,
      description: item.vehicle_description,
      charges: item.vehicle_charges,
      status: item.status,
    });
    setImagePreview(`http://localhost:5000${item.vehicle_image}`); // Set the image preview if needed
    setShowForm(true);
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between mb-4 text-center text-sm-start gap-2">
        <h4 className="py-3 mb-0">
          <span className="text-muted fw-light">Dashboard /</span> Vehicles Type
          List
        </h4>
        <button
          className="btn btn-label-secondary"
          type="button"
          onClick={() => setShowForm(!showForm)} // Show form when button is clicked
        >
          {showForm ? "Close Form" : "Add vehicle Type"}
        </button>
      </div>

      <Modal
        show={showForm}
        onHide={setShowForm}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Vehicle Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showForm && (
            <div className="container">
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label ">Vehicle Image:</label>
                    <div className="input-group custom-file-upload">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        id="file-upload"
                        className="file-upload-input"
                      />
                      <label
                        htmlFor="file-upload"
                        className="file-upload-label"
                      >
                        Choose file
                      </label>
                      <span className="file-upload-name">
                        {"No file chosen"}
                      </span>
                    </div>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-preview"
                      />
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Vehicle Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Charges Per/KM:</label>
                    <input
                      type="text"
                      name="charges"
                      value={formData.charges}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Vehicle Description:</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Vehicle Base Fare:</label>
                    <input
                      type="text"
                      name="base_fare"
                      value={formData.base_fare}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Status:</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <Button variant="primary" type="submit" className="me-2">
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <div className="row">
        <div className="col-lg-12 order-0 mb-4">
          {/* <div className="card" style={{borderWidth:"3px",borderColor:"grey"}}> */}
          <div className="card">
            <div className="card-datatable text-nowrap px-3 py-2">
              <div className="dataTables_wrapper dt-bootstrap5 no-footer table-responsive">
                <div className="row mt-3 mb-3 ">
                  <div className="col-sm-12 col-md-6 ">
                    <div className="d-flex align-items-center mb-3">
                      <label className="me-2 ms-3">Select Status:</label>
                      <select
                        className="form-select"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        style={{ width: "250px" }}
                      >
                        <option value="All">All</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-sm-12 col-md-6">
                    <div
                      id="example_filter"
                      className="dataTables_filter   d-flex align-items-center"
                    >
                      <label className="me-2">Search:</label>
                      <input
                        type="search"
                        className="form-control me-5"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-controls="example"
                        style={{ width: "250px" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row dt-row">
                  <div className="col-sm-12">
                    <table
                      id="example"
                      className="table table-striped table-bordered dataTable no-footer"
                      cellSpacing="0"
                      width="100%"
                      aria-describedby="example_info"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th style={{ width: "58px" }}>Image</th>
                          <th style={{ width: "90px" }}>Vehicle Name</th>
                          <th style={{ width: "90px" }}>Vehicle Base Fare</th>
                          <th style={{ width: "70px" }}>Charges Per/Km</th>
                          <th style={{ width: "75px" }}> Status</th>
                          <th style={{ width: "68px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item) => (
                          <tr key={item.vehicle_id}>
                            <td>
                              <img
                                src={`http://localhost:5000${item.vehicle_image}`}
                                alt={item.vehicle_name}
                                width="50"
                              />
                            </td>
                            <td>{item.vehicle_name}</td>
                            <td>{item.vehicle_base_fare}</td>
                            <td>{item.vehicle_charges}</td>
                            <td>
                              {item.status === "Active" ? (
                                <span className="status-active">Active</span>
                              ) : (
                                <span className="status-inactive">
                                  Inactive
                                </span>
                              )}
                            </td>
                            <td>
                              <span
                                onClick={() => handleEdit(item)}
                                style={{
                                  cursor: "pointer",
                                  color: "blue",
                                  marginLeft: 15,
                                }}
                              >
                                <i className="bi bi-pencil me-1 fs-4"></i>
                              </span>
                              <span
                                onClick={() => handleDelete(item.vehicle_id)}
                                style={{
                                  cursor: "pointer",
                                  color: "red",
                                  marginLeft: 15,
                                }}
                              >
                                <i className="bi bi-trash me-1 fs-4 text-danger"></i>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesTypes;
