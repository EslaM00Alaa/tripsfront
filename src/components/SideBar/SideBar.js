import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {
  faPlus,
  faEye,
  faSuitcase,
  faUsers,
  faBlog,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  return (
    <>
    <Container>
    <Navbar key={false} expand={false} className="bg-body-tertiary mb-3">
        <Container fluid>
          <Navbar.Brand href="#">Dashboard</Navbar.Brand>
          <Navbar.Toggle
            aria-controls={`offcanvasNavbar-expand-${false}`}
            className="border-none"
          >
            <Button variant="primary" className="btn-primary">
              <FontAwesomeIcon icon={faArrowLeft} />
            </Button>
          </Navbar.Toggle>

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                Dashboard
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className={`"position-sticky"  `}>
                <ul className="nav flex-column mt-5">
                  <li className="nav-item">
                    <Link className="nav-link" to="/addTrip">
                      <FontAwesomeIcon
                        icon={faPlus}
                        size="2xl"
                        className="me-3"
                      />
                      Add Trip
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/allTrips">
                      <FontAwesomeIcon
                        icon={faSuitcase}
                        size="2xl"
                        className="me-3"
                      />
                      All Trips
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/addBlog">
                      <FontAwesomeIcon
                        icon={faBlog}
                        size="2xl"
                        className="me-2"
                      />
                      Add Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/allBlogs">
                      <FontAwesomeIcon
                        icon={faEye}
                        size="2xl"
                        className="me-3"
                      />
                      All Blog
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">
                      <FontAwesomeIcon
                        icon={faUsers}
                        size="2xl"
                        className="me-3"
                      />
                      Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/contactmessage">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        size="2xl"
                        className="me-3"
                      />
                      Contact
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/addAdmin">
                      <FontAwesomeIcon
                        icon={faPlus}
                        size="2xl"
                        className="me-3"
                      />
                      Add Admin
                    </Link>
                  </li>
                </ul>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </Container>
    
    </>
  );
}

export default SideBar;
