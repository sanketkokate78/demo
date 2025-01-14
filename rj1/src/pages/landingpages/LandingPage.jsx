// src/App.js
import React, { useState } from 'react';
import { Button, Container, Modal, Form, Navbar, Nav } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Landing.css'

const LandingPage = () => {

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="shadow-sm py-4"fixed="top" >
        <Container>
          <Navbar.Brand href="#home">QuickMove</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#Home">Home</Nav.Link>
              <Nav.Link href="#Services">Services</Nav.Link>
              <Nav.Link href="#About Us">About Us</Nav.Link>
              <Nav.Link href="#Become a partner">Become a partner</Nav.Link>
              <Nav.Link href="#Contact Us">Contact Us</Nav.Link>
              <Button variant="primary" className="ms-3" href="/signin">
                Login
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container fluid className="hero-section">
        <h1 className="hero-h1" >Need Help Moving or Delivering?</h1>
        <p className="hero-p" >Get a team of movers or drivers in just minutes. Whether it’s a big move or small delivery, QuickMove has you covered.</p>
    
      </Container>

      {/* How It Works Section */}
      <Container className="mt-5">
        <h2 className="text-center">How It Works</h2>
        <div className="row">
          <div className="col-md-4">
            <h4>1. Book Your Move</h4>
            <p>Enter details about what you need moved and when.</p>
          </div>
          <div className="col-md-4">
            <h4>2. We Arrive</h4>
            <p>Our team arrives with the necessary equipment, on time!</p>
          </div>
          <div className="col-md-4">
            <h4>3. Smooth Experience</h4>
            <p>Sit back, relax, and we’ll take care of the rest.</p>
          </div>
        </div>
      </Container>

      {/* Pricing Section */}
      <Container className="mt-5">
        <h2 className="text-center">Pricing</h2>
        <div className="row">
          <div className="col-md-4">
            <h4>Hourly Rate</h4>
            <p>Starting at $50/hour. Ideal for small moves or deliveries.</p>
          </div>
          <div className="col-md-4">
            <h4>Flat Rate Move</h4>
            <p>Fixed pricing for larger moves. Get a custom quote.</p>
          </div>
          <div className="col-md-4">
            <h4>Special Services</h4>
            <p>Need packing or furniture delivery? We offer customized services!</p>
          </div>
        </div>
      </Container>

      {/* Testimonials Section */}
      <Container className="mt-5">
        <h2 className="text-center">What Our Customers Say</h2>
        <div className="row">
    <div className="col-md-4">
      <Card>
        <Card.Body>
          <p>"I was blown away by the efficiency and care of the QuickMove team. Highly recommend!"</p>
          <h5>- John M.</h5>
        </Card.Body>
      </Card>
    </div>
    <div className="col-md-4">
      <Card>
        <Card.Body>
          <p>"Needed a last-minute delivery. QuickMove was on it within an hour. Amazing!"</p>
          <h5>- Jo M.</h5>
        </Card.Body>
      </Card>
    </div>
    <div className="col-md-4">
      <Card>
        <Card.Body>
          <p>"Great service and very friendly staff. Will use again!"</p>
          <h5>- Alex T.</h5>
        </Card.Body>
      </Card>
    </div>
  </div>
      </Container>

     
            
    </div>
  );
};

export default LandingPage;
