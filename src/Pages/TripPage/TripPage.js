import React, { useState, useEffect } from 'react';
import api from '../../components/db/api';
import "./TripPage.css"
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import noResultsCategory from "../../images/notfound.jpeg"
function TripPage() {
  const [tripsCategory1, setTripsCategory1] = useState([]);
  const [tripsCategory2, setTripsCategory2] = useState([]);
  const [tripsCategory3, setTripsCategory3] = useState([]);
  const [tripsCategory4, setTripsCategory4] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <>
    <Header />

    <Container>
    <h2 className="text-center my-5">Excurions from Hurghada</h2>
    <Row className="mt-5 mb-5">
    {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : tripsCategory1.length === 0 ? (
            <Col className="text-center">
              <img src={noResultsCategory} alt="No results" className="no-results-image" />
          
              <h2 className="fs-5">Soon there will be flights available from Hurghada</h2>
            </Col>
          ) : (
     tripsCategory1.map(trip => (
                      <Col key={trip.id} xs={12} lg={4} className="text-center p-2">
                        <Card>
                          <Card.Img variant="top" src={trip.image} className="heightImageCard" />
                          <Card.Body>
                            <Card.Text className="fs-5">{trip.name}</Card.Text>
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
                          <Link to={`/detaileTrip/${trip.id}`}>
                            <Button variant="primary"  className="ms-2">MORE DETIELES</Button>
                              
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
            )  ))}
      </Row>
<hr />
      {/* category  2 */}

      <h2 className="text-center my-5">Excursions from Marsa Alam</h2>
      <Row className="mt-5 mb-5">
    {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : tripsCategory2.length === 0 ? (
            <Col className="text-center">
              <img src={noResultsCategory} alt="No results" className="no-results-image" />
              <h2 className="fs-5">Soon there will be flights available from Marsa Alam</h2>
    
            </Col>
          ) : (
     tripsCategory2.map(trip => (
                      <Col key={trip.id} xs={12} lg={4} className="text-center p-2">
                        <Card>
                          <Card.Img variant="top" src={trip.image} className="heightImageCard" />
                          <Card.Body>
                            <Card.Text className="fs-5">{trip.name}</Card.Text>
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
                          <Link to={`/detaileTrip/${trip.id}`}>
                            <Button variant="primary"  className="ms-2">MORE DETIELES</Button>
                              
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
            )  ))}
      </Row>
      <hr />
      {/* category 3 */}

      <h2 className="text-center my-5">Excursions from El- Quseir</h2>
      <Row className="mt-5 mb-5">
    {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : tripsCategory3.length === 0 ? (
            <Col className="text-center">
              <img src={noResultsCategory} alt="No results" className="no-results-image" />
              <h2 className="fs-5">Soon there will be flights available from El- Quseir</h2>
            
            </Col>
          ) : (
     tripsCategory3.map(trip => (
                      <Col key={trip.id} xs={12} lg={4} className="text-center p-2">
                        <Card>
                          <Card.Img variant="top" src={trip.image} className="heightImageCard" />
                          <Card.Body>
                            <Card.Text className="fs-5">{trip.name}</Card.Text>
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
                          <Link to={`/detaileTrip/${trip.id}`}>
                            <Button variant="primary"  className="ms-2">MORE DETIELES</Button>
                              
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
            )  ))}
      </Row>
      <hr />
      {/* category 4 */}
      <h2 className="text-center my-5">Safaga Shore Excursions</h2>
      <Row className="mt-5 mb-5">
    {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : tripsCategory4.length === 0 ? (
            <Col className="text-center">
              <img src={noResultsCategory} alt="No results" className="no-results-image" />
              <h2 className="fs-5">Soon there will be flights available from Safaga Shore</h2>
          
            </Col>
          ) : (
     tripsCategory4.map(trip => (
                      <Col key={trip.id} xs={12} lg={4} className="text-center p-2">
                        <Card>
                          <Card.Img variant="top" src={trip.image} className="heightImageCard" />
                          <Card.Body>
                            <Card.Text className="fs-5">{trip.name}</Card.Text>
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
                          <Link to={`/detaileTrip/${trip.id}`}>
                            <Button variant="primary"  className="ms-2">MORE DETIELES</Button>
                              
                            </Link>
                          </Card.Body>
                        </Card>
                      </Col>
            )  ))}
      </Row>
    </Container>
    <Footer />
      
    </>
  )
}

export default TripPage
