import React, { useState, useEffect } from "react";
import axios from "axios";
import imageco from "../../../assets/imageco.png";
import imagecopy from "../../../assets/imagecopy.png";
import "./Manageservice.css";
import { Modal, Button, Form } from "react-bootstrap";

const ManageServices = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    color_code: "",
    status: "Active",
  });

  const [serviceName, setServiceName] = useState("");
  const [status, setStatus] = useState("Active"); // Default to Active
  const [textColor, setTextColor] = useState("#17202a");
  const [image, setImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All"); // Selected status state

  const filteredData = data.filter((item) => {
    const matchesSearchQuery =
      item.category_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category_colorcode.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;

    return matchesSearchQuery && matchesStatus;
  });

  // const [searchQuery, setSearchQuery] = useState('');

  // const filteredData = data.filter(item =>
  //   item.category_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   item.category_colorcode.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // Fetch data from the database when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/categories"); // Adjust the URL as needed
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file)); // Show preview of the image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();

    // Only append the image if a new one is uploaded
    if (formData.image) {
      newFormData.append("category_image", formData.image);
    } else {
      // If no new image, append a flag or existing image URL
      //newFormData.append("existing_image", imagePreview);
      // Send existing image URL if no new image
    }

    newFormData.append("category_name", formData.name);
    newFormData.append("category_colorcode", formData.color_code);
    newFormData.append("status", formData.status);

    try {
      if (formData.category_id) {
        // If editing, send a PUT request
        await axios.put(
          `http://localhost:5000/categories/${formData.category_id}`,
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // If adding, send a POST request
        await axios.post("http://localhost:5000/categories", newFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchData(); // Refresh the data after adding a new service
      setFormData({ image: null, name: "", color_code: "", status: "Active" }); // Reset form
      setImagePreview(null); // Reset image preview
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/categories/${id}`); // Adjust the URL as needed
      fetchData(); // Refresh the data after deletion
    } catch (error) {
      console.error("Error deleting the service:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      category_id: item.category_id, // Store the ID for updating
      image: null, // You may want to handle image separately
      name: item.category_name,
      color_code: item.category_colorcode,
      status: item.status,
    });
    setImagePreview(`http://localhost:5000${item.category_image}`); // Set the image preview if needed
    setShowForm(true);
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between mb-4 text-center text-sm-start gap-2">
        <h4 className="py-3 mb-0">
          <span className="text-muted fw-light">Dashboard /</span> Services List
        </h4>
        <button
          className="btn btn-label-secondary"
          type="button"
          onClick={() => setShowForm(!showForm)} // Show form when button is clicked
        >
          {showForm ? "Close Form" : "Add Service"}
        </button>
      </div>

      {/* Form to Add Service */}

      <Modal
        show={showForm}
        onHide={setShowForm}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showForm && (
            <div className="container">
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label ">Service Image:</label>
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
                    <label className="form-label">Name:</label>
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
                    <label className="form-label">Color Code:</label>
                    <input
                      type="text"
                      name="color_code"
                      value={formData.color_code}
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
                          <th style={{ width: "90px" }}>service Name</th>
                          <th style={{ width: "70px" }}>Text Color Code</th>
                          <th style={{ width: "75px" }}> Status</th>
                          <th style={{ width: "68px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item) => (
                          <tr key={item.category_id}>
                            <td>
                              <img
                                src={`http://localhost:5000${item.category_image}`}
                                alt={item.category_name}
                                width="50"
                              />
                            </td>
                            <td>{item.category_name}</td>
                            <td>{item.category_colorcode}</td>
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
                                onClick={() => handleDelete(item.category_id)}
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

    //   </div>
  );
};

export default ManageServices;
