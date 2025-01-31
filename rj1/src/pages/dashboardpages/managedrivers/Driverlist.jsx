import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import van from "../../../assets/van.png";
import XL from "../../../assets/xl.png";
import Driverdetails from "./Driverdetails";
import AssignDriver from "./Assigndriver";

const Driverlist = () => {
  const [data, setData] = useState([]);
  const [driverData, setDriverData] = useState([]);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/driver_list");
        setData(response.data);
        setDriverData(response.data);
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };
    fetchDriverData();
  }, []);

  const [formData, setFormData] = useState({
    driver_image: null,
    name: "",
    email: "",
    mobile: "",
    address: "",
    dlnumber: "",
    dlimage: null,
    number_plate: "",
    image_nplate: null,
    other_doc: null,
    vtype: "",
    verified: "Yes",
    vehicle: "",
    status: "Active",
  });

  const [hasVehicle, setHasVehicle] = useState(false);

  // Handle radio button change
  // const handleVehicleOptionChange = (e) => {
  //   setHasVehicle(e.target.value === "Yes");
  // };

  const handleVehicleOptionChange = (e) => {
    const { value } = e.target; // Access the value of the selected radio button
    setFormData((prevData) => ({
      ...prevData,
      vehicle: value, // Set vehicle to "Yes" or "No" based on user's choice
    }));
    setHasVehicle(value === "Yes"); // Update hasVehicle state
  };

  // State for image previews
  const [imagePreviews, setImagePreviews] = useState({
    driver_image: null,
    dlimage: null,
    image_nplate: null,
    other_doc: null, // Add other_doc preview
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All"); // Selected status state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedverifide, setSelectedverifide] = useState("Yes");

  const filteredData = data.filter((item) => {
    const matchesSearchQuery =
      item.driver_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driver_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.driver_mobile.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;

    // const matchesVehicle =
    // hasVehicle === "All" || (hasVehicle === "Yes" ? item.is_vehicle === "Yes" : item.is_vehicle === "No");

    const matchesVerified =
      selectedverifide === "All" ||
      (selectedverifide === "Yes"
        ? item.is_verified === "Yes"
        : item.is_verified === "No");

    // return matchesSearchQuery && matchesStatus && matchesVehicle && matchesVerified;

    return matchesSearchQuery && matchesStatus && matchesVerified;
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/driver_list");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e, fieldId) => {
    const file = e.target.files[0];
    if (file) {
      // Update formData with the selected file
      setFormData((prevData) => ({ ...prevData, [fieldId]: file }));

      // Create a preview URL for the selected file
      const imageUrl = URL.createObjectURL(file);
      setImagePreviews((prevPreviews) => ({
        ...prevPreviews,
        [fieldId]: imageUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();

    // Append all images to FormData
    for (const field in formData) {
      if (formData[field] instanceof File) {
        newFormData.append(field, formData[field]);
      }
    }

    // Append other form data
    newFormData.append("driver_name", formData.name);
    newFormData.append("driver_email", formData.email);
    newFormData.append("driver_mobile", formData.mobile);
    newFormData.append("driver_address", formData.address);
    newFormData.append("driver_dlnumber", formData.dlnumber);
    newFormData.append("vehicle_number_plate", formData.number_plate);

    newFormData.append("driver_vtype", formData.vtype);
    newFormData.append("is_vehicle", formData.vehicle);
    newFormData.append("is_verified", formData.verified);
    newFormData.append("status", formData.status);

    try {
      if (formData.driver_id) {
        // Update existing driver
        await axios.put(
          `http://localhost:5000/driver_list/${formData.driver_id}`,
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Add new driver
        // Check for duplicate entry
        const existingDriver = data.find(
          (item) =>
            item.driver_name.toLowerCase() === formData.name.toLowerCase()
        );
        if (existingDriver) {
          alert("Driver Name already exists!");
          return;
        }

        await axios.post("http://localhost:5000/driver_list", newFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchData();
      setDriverData([...driverData, newFormData]);
      // Reset form data
      setFormData({
        driver_image: null,
        name: "",
        email: "",
        mobile: "",
        address: "",
        dlnumber: "",
        dlimage: null,
        number_plate: "",
        image_nplate: null,
        other_doc: null,
        vtype: "",
        verified: "Yes",
        vehicle: "",
        status: "Active",
      });
      setImagePreviews({
        driver_image: null,
        dlimage: null,
        image_nplate: null,
        other_doc: null,
      });
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:5000/driver_list/${id}`);
        fetchData();
      } catch (error) {
        console.error("Error deleting the driver:", error);
      }
    }
  };

  // const handleEdit = (item) => {
  //   setFormData({
  //     driver_id: item.driver_id,
  //     driver_image: null,
  //     name: item.driver_name,
  //     email: item.driver_email,
  //     mobile: item.driver_mobile,
  //     address: item.driver_address,
  //     dlnumber: item.driver_dlnumber,
  //     dlimage: null,
  //     number_plate: item.vehicle_number_plate,
  //     image_nplate: null,
  //     other_doc: null,
  //     vtype: item.driver_vtype,
  //     verified: item.is_verified,
  //     vehicle: item.is_vehicle,
  //   });
  //   setImagePreviews({
  //     driver_image: `http://localhost:5000${item.driver_image}`,
  //     dlimage: null,
  //     image_nplate: null,
  //     other_doc: null,
  //   });
  //   setShowForm(true);
  // };

  const handleEdit = async (item) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/driver_list/${item.driver_id}`
      );
      const driverData = response.data;

      const response2 = await axios.get(
        `http://localhost:5000/driver_doc/${item.driver_id}`
      );
      const driverDocData = response2.data;

      setFormData({
        driver_id: driverData.driver_id,
        driver_image: null,
        name: driverData.driver_name,
        email: driverData.driver_email,
        mobile: driverData.driver_mobile,
        address: driverData.driver_address,
        dlnumber: driverDocData.driver_dlnumber,
        dlimage: null,
        number_plate: driverDocData.vehicle_number_plate,
        image_nplate: null,
        other_doc: null,
        vtype: driverDocData.driver_vtype,
        verified: driverData.is_verified,
        vehicle: driverData.is_vehicle,
        status: driverData.status,
      });

      setImagePreviews({
        driver_image: `http://localhost:5000${driverData.driver_image}`,
        dlimage: driverDocData.dlimage
          ? `http://localhost:5000${driverDocData.dlimage}`
          : null,
        image_nplate: driverDocData.image_nplate
          ? `http://localhost:5000${driverDocData.image_nplate}`
          : null,
        other_doc: driverDocData.other_doc
          ? `http://localhost:5000${driverDocData.other_doc}`
          : null,
      });

      setShowForm(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between mb-4 text-center text-sm-start gap-2">
        <h4 className="py-3 mb-0">
          <span className="text-muted fw-light">Dashboard /</span> Driver List
        </h4>
        <button
          className="btn btn-label-secondary"
          type="button"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add driver"}
        </button>
      </div>

      <Modal
        show={showForm}
        onHide={() => setShowForm(false)}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Driver</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showForm && (
            <div className="container">
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Profile Image:</label>
                    <div className="input-group custom-file-upload">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "driver_image")}
                        id="file-upload-im"
                        className="file-upload-input"
                      />
                      <label
                        htmlFor="file-upload-im"
                        className="file-upload-label"
                      >
                        Choose file
                      </label>
                      <span className="file-upload-name">
                        {"No file chosen"}
                      </span>
                    </div>
                    {imagePreviews.driver_image && (
                      <img
                        src={imagePreviews.driver_image}
                        alt="Preview"
                        className="img-preview"
                      />
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Full Name:</label>
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
                    <label className="form-label">Email:</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label">Mobile Number:</label>
                    <input
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div>
                    <label className="form-label">Address:</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <div className="form-group mt-2">
                      <label>Do You Have Vehicle? *</label>
                      <div className="mt-2 mb-2">
                        <input
                          type="radio"
                          id="vehicleYes"
                          name="vehicle"
                          value="Yes"
                          checked={formData.vehicle === "Yes"}
                          onChange={handleVehicleOptionChange}
                          style={{ marginRight: "10px" }}
                        />
                        <label
                          htmlFor="vehicleYes"
                          style={{ marginRight: "15px" }}
                        >
                          YES
                        </label>

                        <input
                          type="radio"
                          id="vehicleNo"
                          name="vehicle"
                          value="No"
                          checked={formData.vehicle === "No"}
                          onChange={handleVehicleOptionChange}
                          style={{ marginRight: "10px" }}
                        />
                        <label
                          htmlFor="vehicleNo"
                          style={{ marginRight: "10px" }}
                        >
                          NO
                        </label>
                      </div>
                    </div>
                  </div>

                  {hasVehicle && (
                    <div>
                      <label htmlFor="vtype">Select Vehicle Type *</label>
                      <div
                        className="image-container"
                        style={{
                          textAlign: "center",
                          display: "flex",
                          alignItems: "center",
                          maxWidth: "100%",
                          height: "auto",
                          flex: "1 1 45%",
                        }}
                      >
                        <label className="service-type">
                          <input
                            type="radio"
                            name="vtype"
                            i
                            id="vtype-van"
                            value="Van"
                            onChange={handleChange}
                          />
                          <img
                            src={van}
                            style={{ width: "200px", height: "100px" }}
                          />
                          <i className="fa fa-check hidden"></i>
                          <div className="servise-title">Van</div>
                        </label>

                        <label className="service-type">
                          <input
                            type="radio"
                            name="vtype"
                            id="vtype-xl"
                            value="XL"
                            onChange={handleChange}
                          />
                          <img
                            src={XL}
                            style={{ width: "160px", height: "100px" }}
                          />{" "}
                          <i className="fa fa-check hidden"></i>
                          <div className="servise-title">XL</div>
                        </label>
                      </div>

                      <div className="row mb-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label">Number Plate:</label>
                          <input
                            type="text"
                            name="number_plate"
                            value={formData.number_plate}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                        <div className="col-12 col-md-6">
                          <label className="form-label">
                            Upload Number Plate:
                          </label>
                          <div className="input-group custom-file-upload">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                handleFileChange(e, "image_nplate")
                              }
                              id="file-upload-nplate"
                              className="file-upload-input"
                            />
                            <label
                              htmlFor="file-upload-nplate"
                              className="file-upload-label"
                            >
                              Choose file
                            </label>
                            <span className="file-upload-name">
                              {"No file chosen"}
                            </span>
                          </div>
                          {imagePreviews.image_nplate && (
                            <img
                              src={imagePreviews.image_nplate}
                              alt="Preview"
                              className="img-preview"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Upload Other Document:</label>
                    <div className="input-group custom-file-upload">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "other_doc")}
                        id="file-upload-doc"
                        className="file-upload-input"
                      />
                      <label
                        htmlFor="file-upload-doc"
                        className="file-upload-label"
                      >
                        Choose file
                      </label>
                      <span className="file-upload-name">
                        {"No file chosen"}
                      </span>
                    </div>
                    {imagePreviews.other_doc && (
                      <img
                        src={imagePreviews.other_doc}
                        alt="Preview"
                        className="img-preview"
                      />
                    )}
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label ">
                      Upload Driving License:
                    </label>
                    <div className="input-group custom-file-upload">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "dlimage")}
                        id="file-upload-dl"
                        className="file-upload-input"
                      />
                      <label
                        htmlFor="file-upload-dl"
                        className="file-upload-label"
                      >
                        Choose file
                      </label>
                      <span className="file-upload-name">
                        {"No file chosen"}
                      </span>
                    </div>
                    {imagePreviews.dlimage && (
                      <img
                        src={imagePreviews.dlimage}
                        alt="Preview"
                        className="img-preview"
                      />
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">Is Verified:</label>
                    <select
                      name="verified"
                      value={formData.verified}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="Yes">YES</option>
                      <option value="No">NO</option>
                    </select>
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

                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Driving License Number:
                    </label>
                    <input
                      type="text"
                      name="dlnumber"
                      value={formData.dlnumber}
                      onChange={handleChange}
                      className="form-control"
                    />
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
                <div className="row mt-3 mb-3">
                  <div className="col-sm-12 col-md-3">
                    <label className="">Is vehicle:</label>
                    <select
                      className="form-select"
                      value={hasVehicle}
                      onChange={(e) => setHasVehicle(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="col-sm-12 col-md-3">
                    <label className="">Is verified:</label>
                    <select
                      className="form-select"
                      value={selectedverifide}
                      onChange={(e) => setSelectedverifide(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>

                  <div className="col-sm-12 col-md-3 ">
                    <label className="">Select Status:</label>
                    <select
                      className="form-select"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="All">All</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="col-sm-12 col-md-3">
                    <div id="example_filter" className="dataTables_filter">
                      <label className="">Search:</label>
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-controls="example"
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
                          <th style={{ width: "68px" }}>Profile ID</th>
                          <th>Profile</th>
                          <th>Contacts</th>
                          <th>Status</th>
                          <th>Is Vehicle</th>
                          <th>Is Verified</th>
                          <th style={{ width: "68px" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((item) => (
                          <tr key={item.driver_id}>
                            <td>{item.driver_id}</td>

                            <td>
                              <img
                                src={`http://localhost:5000${item.driver_image}`}
                                alt={item.driver_name}
                                width="50"
                                // style={{padding:"8px"}}
                              />
                              <span>{item.driver_name}</span>
                            </td>
                            <td>
                              {item.driver_email} <br></br>
                              <span>{item.driver_mobile}</span>
                            </td>
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
                              {item.is_vehicle === "Yes" ? (
                                <span className="status-active">Yes</span>
                              ) : (
                                <span className="status-inactive">No</span>
                              )}
                            </td>
                            <td>
                              {item.is_verified === "Yes" ? (
                                <span className="status-active">Yes</span>
                              ) : (
                                <span className="status-inactive">No</span>
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
                                onClick={() => handleDelete(item.driver_id)}
                                style={{
                                  cursor: "pointer",
                                  color: "red",
                                  marginLeft: 15,
                                }}
                              >
                                <i className="bi bi-trash me-1 fs-4 text-danger"></i>
                              </span>

                              <span>
                                <Link
                                  to={`/admin/dashboard/manage-driver/driver-details/${item.driver_id}`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Driverlist;
