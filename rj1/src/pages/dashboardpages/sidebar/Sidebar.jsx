// import React, { useState } from 'react';
// import { Nav, NavDropdown ,  Card  } from 'react-bootstrap';
// import Accordion from 'react-bootstrap/Accordion';
// import { Link } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import logo from '../../../assets/logo.png'
// import './SideBar.css'



// const Sidebar = ({ setSidebarCollapsed, activeComponent,setActiveComponent }) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const toggleSidebar = () => {
//     setIsCollapsed(!isCollapsed);
//     setSidebarCollapsed(!isCollapsed);
//   };

//   const handleComponentSelect = (component) => {
//     setActiveComponent(component);
//   };


//   const [activeKey, setActiveKey] = useState('');


//   return (
//     <div className={` flex-shrink-0 p-3   ${isCollapsed ? 'collapsed' : ''} sidebar`} style={{ width: isCollapsed ? '80px' : '250px'}}>

//       <div className='d-flex align-items-center mb-0 mt-0'>
//       <img src={logo} alt="Your Alt Text"  style={{ width: '40%', height: 'auto', marginLeft: '20px'}} />

//       <Button variant="light" className=" btn-sm " 
//       style={{ width: '40px', marginLeft: '10px'}} 
//       onClick={toggleSidebar}>
//         <i className={`bi ${isCollapsed ? 'bi-chevron-right ' : 'bi-chevron-left '}`}></i>
//       </Button>

//       </div>

//       <Nav className="flex-column">
//         <Nav.Link as={Link} to="/admin/dashboard" className="change" activeclassname="active">
//           <i className="bi bi-house-fill icon-manage"></i> {!isCollapsed && 'Dashboard'}
//         </Nav.Link>
//         <Nav.Link as={Link} to="#" onClick={() => handleComponentSelect('ManageServices')}className="change" activeclassname="active">
//           <i className="bi bi-table icon-manage"></i> {!isCollapsed && 'Manage Services'}
//         </Nav.Link>
//         <Nav.Link as={Link} to="#" onClick={() => setActiveComponent('ManageVehicles')} className="change" activeclassname="active">
//           <i className="bi bi-car-front-fill icon-manage"></i> {!isCollapsed && 'Manage Vehicles'}
//         </Nav.Link>
//         <Nav.Link as={Link} to="#" onClick={() => setActiveComponent('ManageBookings')} className="change" activeclassname="active">
//           <i className="bi bi-journal-check icon-manage"></i> {!isCollapsed && 'Manage Bookings'}
//         </Nav.Link>
//         <Nav.Link as={Link} to="/analytics" className="change" activeclassname="active">
//           <i className="bi bi-people-fill icon-manage"></i> {!isCollapsed && 'Manage Customers'}
//         </Nav.Link>

       
// <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
//           <Accordion.Item eventKey="manage-driver">
//             <Accordion.Header className="change">
//               <i className="bi bi-person icon-manage"></i> Manage Driver
//             </Accordion.Header>
//             <Accordion.Body className="accordion-body">
//               <Nav className="flex-column">
//                 <Nav.Link as={Link} to="/manage-driver/driver-list" className="nav-link">Driver List</Nav.Link>
//                 <Nav.Link as={Link} to="/manage-driver/assign-vehicles-to-drivers" className="nav-link">Assign Vehicles To Drivers</Nav.Link>
//                 <Nav.Link as={Link} to="/manage-driver/occupied-driver-list" className="nav-link">Driver Availablity</Nav.Link>
//               </Nav>
//             </Accordion.Body>
//           </Accordion.Item>
//         </Accordion>

//         <Nav.Link as={Link} to="/analytics" className="change" activeclassname="active">
//           <i className="bi bi-people-fill icon-manage"></i> {!isCollapsed && 'Manage Helpers'}
//         </Nav.Link>
//         <Nav.Link as={Link} to="/profile" className="change" activeclassname="active">
//           <i className="bi bi-person icon-manage"></i> {!isCollapsed && 'Driver Availablity'}
//         </Nav.Link>
//         <Nav.Link as={Link} to="/profile" className="change" activeclassname="active">
//           <i className="bi bi-tags icon-manage"></i> {!isCollapsed && 'Offers / Promocode'}
//         </Nav.Link>
//         <Nav.Link as={Link} to="/profile" className="change" activeclassname="active">
//           <i className="bi bi-bell-fill icon-manage"></i> {!isCollapsed && 'Manage Notifications'}
//         </Nav.Link>
//         <Nav.Link as={Link} to="/profile" className="change" activeclassname="active">
//           <i className="bi bi-journal-check icon-manage"></i> {!isCollapsed && 'Manage Contents'}
//         </Nav.Link>
//         <Nav.Link as={Link} to="/profile" className="change" activeclassname="active">
//           <i className="bi bi-gear icon-manage"></i> {!isCollapsed && 'Manage Admin Settings'}
//         </Nav.Link>
       
//       </Nav>
//     </div>
//   );
// }

// export default Sidebar;






import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import logo from '../../../assets/logo.png'
import './SideBar.css'



const Sidebar = ({ setSidebarCollapsed}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    setSidebarCollapsed(!isCollapsed);
  };

 

  const [activeKey, setActiveKey] = useState('');


  return (
    <div className={` flex-shrink-0 p-3   ${isCollapsed ? 'collapsed' : ''} sidebar`} style={{ width: isCollapsed ? '80px' : '250px'}}>

      <div className='d-flex align-items-center mb-0 mt-0'>
      <img src={logo} alt="Your Alt Text"  style={{ width: '40%', height: 'auto', marginLeft: '20px'}} />

      <Button variant="light" className=" btn-sm " 
      style={{ width: '40px', marginLeft: '10px'}} 
      onClick={toggleSidebar}>
        <i className={`bi ${isCollapsed ? 'bi-chevron-right ' : 'bi-chevron-left '}`}></i>
      </Button>

      </div>

      <Nav className="flex-column">
        <Nav.Link as={Link} to="/admin/dashboard" className="change" activeclassname="active">
          <i className="bi bi-house-fill icon-manage"></i> {!isCollapsed && 'Dashboard'}
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/dashboard/manageservices" className="change" activeclassname="active">
          <i className="bi bi-table icon-manage"></i> {!isCollapsed && 'Manage Services'}
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/dashboard/managevehicles" className="change" activeclassname="active">
          <i className="bi bi-car-front-fill icon-manage"></i> {!isCollapsed && 'Manage Vehicles'}
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/dashboard/managebookings"  className="change" activeclassname="active">
          <i className="bi bi-journal-check icon-manage"></i> {!isCollapsed && 'Manage Bookings'}
        </Nav.Link>
        <Nav.Link as={Link} to="/analytics" className="change" activeclassname="active">
          <i className="bi bi-people-fill icon-manage"></i> {!isCollapsed && 'Manage Customers'}
        </Nav.Link>

       
<Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
          <Accordion.Item eventKey="manage-driver">
            <Accordion.Header className="change">
              <i className="bi bi-person icon-manage"></i> Manage Driver
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
              <Nav className="flex-column">
                <Nav.Link as={Link} to="/admin/dashboard/manage-driver/driver-list" className="nav-link">Driver List</Nav.Link>
                <Nav.Link as={Link} to="/admin/dashboard/manage-driver/assign-vehicles-to-drivers" className="nav-link">Assign Vehicles To Drivers</Nav.Link>
                <Nav.Link as={Link} to="/admin/dashboard/manage-driver/occupied-driver-list" className="nav-link">Driver Availablity</Nav.Link>
              </Nav>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Nav.Link as={Link} to="/analytics" className="change" activeclassname="active">
          <i className="bi bi-people-fill icon-manage"></i> {!isCollapsed && 'Manage Helpers'}
        </Nav.Link>
        <Nav.Link as={Link} to="/profile" className="change" activeclassname="active">
          <i className="bi bi-person icon-manage"></i> {!isCollapsed && 'Driver Availablity'}
        </Nav.Link>
        <Nav.Link as={Link} to="/profile" className="change" activeclassname="active">
          <i className="bi bi-tags icon-manage"></i> {!isCollapsed && 'Offers / Promocode'}
        </Nav.Link>
        <Nav.Link as={Link} to="/profile" className="change" activeclassname="active">
          <i className="bi bi-bell-fill icon-manage"></i> {!isCollapsed && 'Manage Notifications'}
        </Nav.Link>
        <Nav.Link as={Link} to="/profile" className="change" activeclassname="active">
          <i className="bi bi-journal-check icon-manage"></i> {!isCollapsed && 'Manage Contents'}
        </Nav.Link>
        <Nav.Link as={Link} to="/profile" className="change" activeclassname="active">
          <i className="bi bi-gear icon-manage"></i> {!isCollapsed && 'Manage Admin Settings'}
        </Nav.Link>
       
      </Nav>
    </div>
  );
}

export default Sidebar;




