import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../components/db/api";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Container,
  Row,
  Col,
  Card,
  ListGroup,
} from "react-bootstrap";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import "./Detailes.css";
function MoreDetails() {
  const [tripDetails, setTripDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/trips/trip/${id}`)
      .then((response) => {
        setTripDetails(response.data.trips[0]);
        console.log("Display Details Trips Done !!!!");
      })
      .catch((error) => {
        console.error("Failed to fetch trip details:", error);
      });
  }, [id]);

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    api
      .get("/trips/random4")
      .then((response) => {
        setTrips(response.data.trips);
        console.log("Display All Trips Done !!!!");
      })
      .catch((error) => {
        console.error("Error fetching trips:", error);
      });
  }, []);
  async function insertOrder(
    name,
    trip_id,
    number_of_person,
    arrivaldate,
    departuredate,
    flight_number,
    hotel_name,
    room_num
  ) {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          token: `${token}`,
        },
      };
      let response = await api.post(
        "/orders",
        {
          name,
          trip_id,
          number_of_person,
          arrivaldate,
          departuredate,
          flight_number,
          hotel_name,
          room_num,
        },
        config
      );
      console.log(response.data.url);
      window.open(response.data.url, "_blank");
    } catch (error) {
      alert(error);
    }
  }
  const [name, setName] = useState("");
  const [trip_id, setTrip_id] = useState(id);
  const [number_of_person, setNum] = useState(0);
  const [arrivaldate, setArrivaldate] = useState("");
  const [departuredate, setDeparturedate] = useState("");
  const [flight_number, setFnum] = useState(0);
  const [hotel_name, setHname] = useState("");
  const [room_num, setRnum] = useState(0);

  return (
    <>
      <Header />
      <Container className="mt-5 mb-5">
        {tripDetails && (
          
          <Row>
        <div className="d-flex align-items-center justify-content-between">
              <img
                className="d-block imageCurrentTrip "
                src={tripDetails.image}
                alt="imageCurrentTrip"
              />
              {/* <div className="video w-50 p-2">
              <iframe width="560" height="315" src="https://www.youtube.com/embed/oUFN7I67dIU?si=1FibPvSL8z4S82B6" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div> */}
        </div>

            <Col className="mb-3 w-50">
              <h2 className="title-detailes">{tripDetails.name}</h2>
              <Card className="cardBook">
                <ListGroup className="list-group-flush">
                  <ListGroup.Item className="d-flex align-items-center justify-content-between">
                    <p>
                      <span className="price">{tripDetails.price}$</span>/Per
                      person
                    </p>
                    <Button
                      color="primary"
                      className="btnBook"
                      onClick={handleShow}
                    >
                      Book Now
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <ModalHeader>Book Now</ModalHeader>
                      <ModalBody>
                        <form>
                          <div className="mb-1">
                            <label htmlFor="name" className="form-label">
                              Name :
                            </label>
                            <input
                              onChange={(e) => setName(e.target.value)}
                              type="text"
                              className="form-control"
                              id="name"
                              name="name"
                              required
                            />
                          </div>
                          <div className="mb-1">
                            <label
                              htmlFor="numberOfPeople"
                              className="form-label"
                            >
                              Number Of People :
                            </label>
                            <input
                              onChange={(e) => setNum(e.target.value)}
                              type="number"
                              className="form-control"
                              id="numberOfPeople"
                              name="numberOfPeople"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="arrivalDate" className="form-label">
                              Arrival Date :
                            </label>
                            <input
                              onChange={(e) => setArrivaldate(e.target.value)}
                              type="date"
                              className="form-control"
                              id="arrivalDate"
                              name="arrivalDate"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="departureDate"
                              className="form-label"
                            >
                              Departure Date :
                            </label>
                            <input
                              onChange={(e) => setDeparturedate(e.target.value)}
                              type="date"
                              className="form-control"
                              id="departureDate"
                              name="departureDate"
                            />
                          </div>
                          <div className="mb-1">
                            <label
                              htmlFor="flightNumber"
                              className="form-label"
                            >
                              Flight Number :
                            </label>
                            <input
                              onChange={(e) => setFnum(e.target.value)}
                              type="number"
                              className="form-control"
                              id="flightNumber"
                              name="flightNumber"
                            />
                          </div>
                          <div className="mb-1">
                            <label htmlFor="hotelName" className="form-label">
                              Hotel Name :
                            </label>
                            <input
                              onChange={(e) => setHname(e.target.value)}
                              type="text"
                              className="form-control"
                              id="hotelName"
                              name="hotelName"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="roomNumber" className="form-label">
                              Room Number :
                            </label>
                            <input
                              onChange={(e) => setRnum(e.target.value)}
                              type="number"
                              className="form-control"
                              id="roomNumber"
                              name="roomNumber"
                              required
                            />
                          </div>
                          <Button
                            onClick={() =>
                              insertOrder(
                                name,
                                trip_id,
                                number_of_person,
                                arrivaldate,
                                departuredate,
                                flight_number,
                                hotel_name,
                                room_num
                              )
                            }
                            color="primary"
                          >
                            Send
                          </Button>
                        </form>
                      </ModalBody>
                    </Modal>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center justify-content-between">
                    <span>Duration:</span>{" "}
                    <span className="statusTravel">{tripDetails.duration}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center justify-content-between">
                    <span>Vehicle:</span>{" "}
                    <span className="statusTravel">{tripDetails.vehicle}</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center justify-content-between">
                    <span>Guiding:</span>{" "}
                    <span className="statusTravel">{tripDetails.guiding}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>

            
            <p>Description For This Trip:</p>
            <hr />
            <p>{tripDetails.description}</p>

            {/* <div className="video">
            {tripDetails.video}
              </div> */}
              <div className="video" dangerouslySetInnerHTML={{ __html:tripDetails.video  }}></div>
          </Row>

          
        )}
      </Container>

      <Container>
        <h3 className="text-center mb-5">Another Trips</h3>
        <Row className="mt-5 mb-5">
          {trips.length > 0 ? (
            trips.map((trip) => (
              <div
                key={trip.id}
                className="col-sm-6 col-xs-12 col-md-4 text-center p-2"
              >
                <Card>
                  <Card.Img
                    variant="top"
                    src={trip.image}
                    className="heightImageCard"
                  />
                  <Card.Body>
                    <Card.Text className="fs-5">{trip.name}</Card.Text>
                  </Card.Body>
                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <span className="price">{trip.price}</span>
                      <span className="price">$</span>/Per person
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center justify-content-around">
                      <span>Duration:</span>{" "}
                      <span className="statusTravel">{trip.duration}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center justify-content-around">
                      <span>Vehicle:</span>{" "}
                      <span className="statusTravel">{trip.vehicle}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center justify-content-around">
                      <span>Guiding:</span>{" "}
                      <span className="statusTravel">{trip.guiding}</span>
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Link to={`/detaileTrip/${trip.id}`}>
                      <button className="btn btn-primary">MORE DETAILS</button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <h2 className="text-center">No trips available</h2>
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default MoreDetails;
