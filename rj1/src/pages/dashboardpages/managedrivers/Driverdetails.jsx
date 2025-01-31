import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import van from "../../../assets/van.png";
import XL from "../../../assets/xl.png";

const Driverdetails = () => {
  const { id } = useParams(); // Get the driver ID from the URL
  const [driver, setDriver] = useState(null);
  const [driverDoc, setDriverDoc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const driverResponse = await axios.get(
          `http://localhost:5000/driver_list/${id}`
        );
        const driverDocResponse = await axios.get(
          `http://localhost:5000/driver_doc/${id}`
        );

        setDriver(driverResponse.data);
        setDriverDoc(driverDocResponse.data);
      } catch (error) {
        setError("Failed to fetch driver details. Please try again later.");
      }
    };

    fetchDriverDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>; // Show error message
  }

  if (!driver || !driverDoc) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <Container>
      <h2 className="py-3 mb-0">
        {" "}
        <span className="text-muted fw-light">
          Dashboard / Driver Details /{" "}
        </span>{" "}
        Overview
      </h2>
      <h4 className="mt-4">
        Driver ID : {driver.driver_id}{" "}
        <span className="badge bg-success">VERIFIED</span>
      </h4>
      <p>jan 28, 2025, 0:00</p>

      <Row>
        <Col md={4}>
          <Card>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center text-center">
              <Card.Title>
                {driver.driver_image && (
                  <img
                    src={`http://localhost:5000${driver.driver_image}`}
                    alt="Driver Image"
                    width="150px"
                  />
                )}

                <p>
                  <strong>Name:</strong> {driver.driver_name}
                </p>
                <p>
                  <strong>Driver ID:</strong> {driver.driver_id}
                </p>
              </Card.Title>

              <hr />
              <Card.Text>
                <strong>Details</strong>
                <br />
                <p>
                  <strong>Email:</strong> {driver.driver_email}
                </p>
                <p>
                  <strong>status:</strong>{" "}
                  {driver.status === "Active" ? (
                    <span className="status-active">Active</span>
                  ) : (
                    <span className="status-inactive">Inactive</span>
                  )}
                </p>

                <p>
                  <strong>Is Verified:</strong>{" "}
                  {driver.is_verified === "Yes" ? (
                    <span className="status-active">Yes</span>
                  ) : (
                    <span className="status-inactive">No</span>
                  )}
                </p>
                <p>
                  <strong>Mobile:</strong> {driver.driver_mobile}
                </p>
              </Card.Text>
              <Button variant="primary">Edit Details</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <button
            style={{
              padding: "5px",
              marginRight: "20px",
              backgroundColor: "#1bdb48",
              borderRadius: "10px",
              color: "white",
              border: "none",
            }}
          >
            {" "}
            Overview
          </button>
          <button
            style={{
              padding: "5px",
              marginRight: "20px",
              backgroundColor: "#1bdb48",
              borderRadius: "10px",
              color: "white",
              border: "none",
            }}
          >
            {" "}
            Booking
          </button>
          <button
            style={{
              padding: "5px",
              marginRight: "20px",
              backgroundColor: "#1bdb48",
              borderRadius: "10px",
              color: "white",
              border: "none",
            }}
          >
            {" "}
            Billing
          </button>

          <Card className="mt-4">
            <Card.Body>
              <div className="d-flex justify-content-between mb-3 mt-2 p-3">
                <Card.Title>Vehicle Details</Card.Title>
                <Button variant="primary">Edit Vehicle Details</Button>
              </div>

              <Card.Text>
                <div className="d-flex justify-content-between mb-3 mt-2 p-3">
                  <div>
                    <strong>Vehicle Name:</strong> {driverDoc.driver_vtype}
                    <br />
                    {driverDoc.driver_vtype.toLowerCase() === "van" ? (
                      <img
                        src={van}
                        alt="Van"
                        style={{ width: "200px", height: "100px" }}
                      />
                    ) : driverDoc.driver_vtype.toLowerCase() === "xl" ? (
                      <img
                        src={XL}
                        alt="XL"
                        style={{ width: "200px", height: "100px" }}
                      />
                    ) : (
                      <p>No image available for this vehicle type.</p>
                    )}
                  </div>
                  <div>
                    <p>
                      <strong>Vehicle Number Plate:</strong>{" "}
                      {driverDoc.vehicle_number_plate}
                    </p>
                    {driverDoc.image_nplate && (
                      <img
                        src={`http://localhost:5000${driverDoc.image_nplate}`}
                        alt="Vehicle Number Plate"
                        style={{ width: "150px", height: "100px" }}
                      />
                    )}
                  </div>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <div className="d-flex justify-content-between mb-1 mt-2 p-3">
                <Card.Title>Driving License Details</Card.Title>
                <Button variant="primary">Edit License Details</Button>
              </div>
              <div className="d-flex justify-content-between mb-2 mt-1 p-5">
                <p>
                  <strong>Driving License Number:</strong>{" "}
                  {driverDoc.driver_dlnumber}
                </p>
                {driverDoc.dlimage && (
                  <img
                    src={`http://localhost:5000${driverDoc.dlimage}`}
                    alt="Driving License"
                    style={{ width: "150px", height: "100px" }}
                  />
                )}
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-4">
            <Card.Body>
              <div className="d-flex justify-content-between mb-1 mt-2 p-3">
                <Card.Title>
                  {" "}
                  <h2>Other Documents</h2>{" "}
                </Card.Title>
                <Button variant="primary">Edit other document</Button>
              </div>
              <div className="d-flex justify-content-between mb-3 mt-1 p-5">
                <p>
                  <strong>Other Documents:</strong>{" "}
                </p>
                {driverDoc.other_doc && (
                  <img
                    src={`http://localhost:5000${driverDoc.other_doc}`}
                    alt="Other Document"
                    style={{ width: "150px", height: "100px" }}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
export default Driverdetails;
