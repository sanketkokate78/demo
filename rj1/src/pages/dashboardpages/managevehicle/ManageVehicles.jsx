// import React from 'react'

// const ManageVehicles = () => {
//   return (
//     <div>

// <h1>Manage Vehicles</h1>
// <p>This is the Manage Vehicles page.</p>


//     </div>
//   )
// }

// export default ManageVehicles;




import React,{ useState, useEffect } from "react";
import axios from 'axios';
import imageco from "../../../assets/imageco.png";
import imagecopy from "../../../assets/imagecopy.png";
import "./Managevehicle.css";

const ManageVehicles = () => {

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    image: null,
    name: '',
    base_fare: '',
    traveled_miles:'',
    status: 'Active',
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showForm, setShowForm] = useState(false);


const [searchQuery, setSearchQuery] = useState('');
const [selectedStatus, setSelectedStatus] = useState("All"); 

const filteredData = data.filter(item =>{
  const matchesSearchQuery =
  item.vehicle_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.vehicle_base_fare.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.vehicle_traveled_miles.toLowerCase().includes(searchQuery.toLowerCase())

  const matchesStatus =
      selectedStatus === "All" || item.status === selectedStatus;

    return matchesSearchQuery && matchesStatus;
});



// Fetch data from the database when the component mounts
useEffect(() => {
  fetchData();
}, []);

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/vehicle'); // Adjust the URL as needed
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
  newFormData.append("vehicle_image", formData.image);
}else {
  // If no new image, append a flag or existing image URL
  //newFormData.append("existing_image", imagePreview); 
  
  // Send existing image URL if no new image
}

  newFormData.append("vehicle_name", formData.name);
  newFormData.append("vehicle_base_fare", formData.base_fare);
  newFormData.append("vehicle_traveled_miles", formData.traveled_miles);
  newFormData.append("status", formData.status);

  try {
    if (formData.vehicle_id) {
      // If editing, send a PUT request
      await axios.put(`http://localhost:5000/vehicle/${formData.vehicle_id}`, newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      // If adding, send a POST request
    await axios.post('http://localhost:5000/vehicle', newFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
    fetchData(); // Refresh the data after adding a new service
    setFormData({ image: null, name: '', base_fare: '', traveled_miles: '', status: 'Active' }); // Reset form
    setImagePreview(null); // Reset image preview
    setShowForm(false);
  } catch (error) {
    console.error("Error submitting the form:", error);
  }
};

const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/vehicle/${id}`); // Adjust the URL as needed
    fetchData(); // Refresh the data after deletion
  } catch (error) {
    console.error("Error deleting the service:", error);
  }
};


const handleEdit = (item) => {
  setFormData({
    vehicle_id: item.vehicle_id, // Store the ID for updating
    image: null, // You may want to handle image separately
    name: item.vehicle_name,
    base_fare: item.vehicle_base_fare,
    traveled_miles: item.vehicle_traveled_miles,
    status: item.status,
  });
  setImagePreview(`http://localhost:5000${item.vehicle_image}`);  // Set the image preview if needed
  setShowForm(true);
};

  return (
   
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between mb-4 text-center text-sm-start gap-2">
        <h4 className="py-3 mb-0">
          <span className="text-muted fw-light">Dashboard /</span> Vehicles List
        </h4>
        <button
          className="btn btn-label-secondary"
          type="button"
          
          onClick={() => setShowForm(!showForm)} // Show form when button is clicked
        >
          {showForm ? "Close Form" : "Add vehicle"}
        </button>
      </div>



 {/* Form to Add vehicles */}

 {showForm && (
 <form onSubmit={handleSubmit} className="mb-4">
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleFileChange}  />
          {imagePreview && <img src={imagePreview} alt="Preview" width="100" />}
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Base fare:</label>
          <input type="text" name="base_fare" value={formData.base_fare} onChange={handleChange} required />
        </div>
        <div>
          <label>Traveled miles:</label>
          <input type="text" name="traveled_miles" value={formData.traveled_miles} onChange={handleChange} required />
        </div>
        <div>
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Active">Active</option>
 <option value="Inactive">Inactive</option>         
          </select>
        </div>
        <button type="submit">Add vehicle</button>
      </form>
 )}


      <div className="row">
        <div
          id=""
          className="alert alert-success"
          style={{ display: "none" }}
        >  
        </div>
        <div className="col-lg-12 order-0 mb-4">
          <div className="card">
            <div className="card-datatable text-nowrap">
              <div
                id="example_wrapper"
                className="dataTables_wrapper dt-bootstrap5 no-footer"
              >
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
                        style={{ width: '250px' }}
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
                          <th
                            className="sorting sorting_asc"
                            tabIndex="0"
                            aria-controls="example"
                            rowSpan="1"
                            colSpan="1"
                            aria-sort="ascending"
                            aria-label="Image: activate to sort column descending"
                            style={{ width: "58px" }}
                          >
                            Image
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="service Name: activate to sort column ascending"
                            style={{ width: "90px" }}
                          >
                            Vehicle Name
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="service Name: activate to sort column ascending"
                            style={{ width: "70px" }}
                          >
                            Vehicle Base Fare
                          </th>

                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="service Name: activate to sort column ascending"
                            style={{ width: "70px" }}
                          >
                            Vehicle Traveled Miles
                          </th>

                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Status: activate to sort column ascending"
                            style={{ width: "75px" }}
                          >
                            {" "}
                            Status
                          </th>
                          <th
                            className="sorting"
                            tabIndex="0"
                            aria-controls="example"
                            rowSpan="1"
                            colSpan="1"
                            aria-label="Actions: activate to sort column ascending"
                            style={{ width: "68px" }}
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        

{filteredData.map((item) => (
            <tr key={item.vehicle_id}>
              <td><img src={`http://localhost:5000${item.vehicle_image}`} alt={item.vehicle_name} width="50" /></td>
              <td>{item.vehicle_name}</td>
              <td>{item.vehicle_base_fare}</td>
              <td>{item.vehicle_traveled_miles}</td>
              <td>
    {item.status === 'Active' ? (
        <span className="status-active">Active</span>
    ) : (
        <span className="status-inactive">Inactive</span>
    )}
</td>
              <td>
                
              <span onClick={() => handleEdit(item)} style={{ cursor: 'pointer', color: 'blue', marginLeft:15 }}>
  <i className="bi bi-pencil me-1 fs-4"></i>
</span>
        <span onClick={() => handleDelete(item.vehicle_id)} style={{ cursor: 'pointer', color: 'red', marginLeft:15 }}><i className="bi bi-trash me-1 fs-4 text-danger"></i></span>
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

export default ManageVehicles;
