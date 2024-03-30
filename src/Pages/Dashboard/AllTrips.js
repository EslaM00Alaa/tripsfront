import React, { useState, useEffect } from 'react';
import api from '../../components/db/api';
import "./Dashboard.css";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import Footer from '../../components/Footer/Footer';
import noResultsCategory from "../../images/notfound.jpeg"

function AllTrips() {
  const [tripsCategory1, setTripsCategory1] = useState([]);
  const [tripsCategory2, setTripsCategory2] = useState([]);
  const [tripsCategory3, setTripsCategory3] = useState([]);
  const [tripsCategory4, setTripsCategory4] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [currentTripId, setCurrentTripId] = useState(null);

  useEffect(() => {
    api.get('/trips/all/1')
      .then(response => {
        setTripsCategory1(response.data.trips);
        console.log('Display All Trips Done !!!!');
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    api.get('/trips/all/2')
      .then(response => {
        setTripsCategory2(response.data.trips);
        console.log('Display All Trips Done !!!!');
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    api.get('/trips/all/3')
      .then(response => {
        setTripsCategory3(response.data.trips);
        console.log('Display All Trips Done !!!!');
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    api.get('/trips/all/4')
      .then(response => {
        setTripsCategory4(response.data.trips);
        console.log('Display All Trips Done !!!!');
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching trips:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          token: `${token}`,
        },
      }; 
      api.delete(`/trips/trip/${currentTripId}`,config)
        .then(response => {
          console.log('Trip deleted successfully');
          handleClose(); // Close the modal after deletion
          // Reload the trips after deletion
          Promise.all([
            api.get('/trips/all/1', config).then(response => setTripsCategory1(response.data.trips)),
            api.get('/trips/all/2',config).then(response => setTripsCategory2(response.data.trips)),
            api.get('/trips/all/3', config).then(response => setTripsCategory3(response.data.trips)),
            api.get('/trips/all/4', config).then(response => setTripsCategory4(response.data.trips))
          ]);
        });
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
    }
  };
  
  
  const handleClose = () => {
    setShow(false);
    setCurrentTripId(null); 
  };

  const handleShow = (tripId) => {
    setShow(true);
    setCurrentTripId(tripId);
  };

  return (
    <>
      <Header />
      <SideBar />
      <div className="pt-3 pb-2 mb-3 ">
                <Container>
                <h2 className="text-center">Excurions from Hurghada</h2>
                  <Row className="mt-5 mb-5">
                  {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : tripsCategory1.length === 0 ? (
            <Col className="text-center">
              <img src={noResultsCategory} alt="No results" className="no-results-image" />
          
              <h2 className="fs-5">No flights available from Hurghada</h2>
            </Col>
          ) : (
            tripsCategory1.map(trip => (
                      <Col key={trip.id} xs={12} lg={4} className="text-center p-2">
                        <Card>
                          <Card.Img variant="top" src={trip.image} className="heightImageCard" />
                          <Card.Body>
                            <Card.Text className="fs-3">{trip.name}</Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item><span className="price">{trip.price}</span><span className="price">$</span>/Per person</ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Duration:</span> <span className="statusTravel">{trip.duration}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Vehicle:</span> <span className="statusTravel">{trip.vehicle}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Guiding:</span> <span className="statusTravel">{trip.guiding}</span>
                            </ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Link to={`/updateTrip/${trip.id}`}>
                              <Button variant="primary">Update</Button>
                            </Link>
                            <Button variant="danger" onClick={() => handleShow(trip.id)} className="ms-2">Delete</Button>
                          </Card.Body>
                        </Card>
                      </Col>
          )))}
                  </Row>

                  {/* category 2 */}
                  <h2 className="text-center">Excursions from Marsa Alam</h2>
                  <Row className="mt-5 mb-5">
                  {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : tripsCategory2.length === 0 ? (
            <Col className="text-center">
              <img src={noResultsCategory} alt="No results" className="no-results-image" />
          
              <h2 className="fs-5">No flights available from Marsa Alam</h2>
            </Col>
          ) : (
            tripsCategory2.map(trip => (
                      <Col key={trip.id} xs={12} lg={4} className="text-center p-2">
                        <Card>
                          <Card.Img variant="top" src={trip.image} className="heightImageCard" />
                          <Card.Body>
                            <Card.Text className="fs-3">{trip.name}</Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item><span className="price">{trip.price}</span><span className="price">$</span>/Per person</ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Duration:</span> <span className="statusTravel">{trip.duration}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Vehicle:</span> <span className="statusTravel">{trip.vehicle}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Guiding:</span> <span className="statusTravel">{trip.guiding}</span>
                            </ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Link to={`/updateTrip/${trip.id}`}>
                              <Button variant="primary">Update</Button>
                            </Link>
                            <Button variant="danger" onClick={() => handleShow(trip.id)} className="ms-2">Delete</Button>
                          </Card.Body>
                        </Card>
                      </Col>
          )))}
                  </Row>
                  {/* category 3 */}
                  <h2 className="text-center">Excursions from El- Quseir</h2>
                  <Row className="mt-5 mb-5">
                  {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : tripsCategory3.length === 0 ? (
            <Col className="text-center">
              <img src={noResultsCategory} alt="No results" className="no-results-image" />
          
              <h2 className="fs-5">No flights available from El- Quseir</h2>
            </Col>
          ) : (
            tripsCategory3.map(trip => (
                      <Col key={trip.id} xs={12} lg={4} className="text-center p-2">
                        <Card>
                          <Card.Img variant="top" src={trip.image} className="heightImageCard" />
                          <Card.Body>
                            <Card.Text className="fs-3">{trip.name}</Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item><span className="price">{trip.price}</span><span className="price">$</span>/Per person</ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Duration:</span> <span className="statusTravel">{trip.duration}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Vehicle:</span> <span className="statusTravel">{trip.vehicle}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Guiding:</span> <span className="statusTravel">{trip.guiding}</span>
                            </ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Link to={`/updateTrip/${trip.id}`}>
                              <Button variant="primary">Update</Button>
                            </Link>
                            <Button variant="danger" onClick={() => handleShow(trip.id)} className="ms-2">Delete</Button>
                          </Card.Body>
                        </Card>
                      </Col>
          )))}
                  </Row>
                  {/* category 4 */}
                  <h2 className="text-center">Safaga Shore Excursions</h2>
                  <Row className="mt-5 mb-5">
                  {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : tripsCategory4.length === 0 ? (
            <Col className="text-center">
              <img src={noResultsCategory} alt="No results" className="no-results-image" />
          
              <h2 className="fs-5">No flights available from Safaga Shore</h2>
            </Col>
          ) : (
            tripsCategory4.map(trip => (
                      <Col key={trip.id} xs={12} lg={4} className="text-center p-2">
                        <Card>
                          <Card.Img variant="top" src={trip.image} className="heightImageCard" />
                          <Card.Body>
                            <Card.Text className="fs-3">{trip.name}</Card.Text>
                          </Card.Body>
                          <ListGroup className="list-group-flush">
                            <ListGroup.Item><span className="price">{trip.price}</span><span className="price">$</span>/Per person</ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Duration:</span> <span className="statusTravel">{trip.duration}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Vehicle:</span> <span className="statusTravel">{trip.vehicle}</span>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-flex align-items-center justify-content-around">
                              <span>Guiding:</span> <span className="statusTravel">{trip.guiding}</span>
                            </ListGroup.Item>
                          </ListGroup>
                          <Card.Body>
                            <Link to={`/updateTrip/${trip.id}`}>
                              <Button variant="primary">Update</Button>
                            </Link>
                            <Button variant="danger" onClick={() => handleShow(trip.id)} className="ms-2">Delete</Button>
                          </Card.Body>
                        </Card>
                      </Col>
          )))}
                  </Row>
                </Container>
              </div>
  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You Will Delete This Trip !!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </>
  );
}

export default AllTrips;
