import React, { useState, useEffect } from "react";
import api from "../../components/db/api";
import { Link } from "react-router-dom";
import "./Home.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faFaceGrinWink,
  faAddressBook,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header/Header";
import Carousel from "../../components/Slider/Slider";
import AboutUs from "../../components/AboutUs/AboutUs";
import Footer from "../../components/Footer/Footer";
import Blog from "../../components/Blog/Blog";
import { useTranslation } from "react-i18next";
import image1 from "../../images/cat1.jpg";
import image2 from "../../images/4.avif";
import image3 from "../../images/cat6.jpg";
import image4 from "../../images/cat9.jpg";
import {  useNavigate } from "react-router-dom";
const Home = () => {

  const navigate = useNavigate();
  if(localStorage.getItem("active")==false)
        {
          navigate("/active");
        }

  const { t } = useTranslation();
  const [trips, setTrips] = useState([]);

  // useEffect(() => {
  //   const fetchTrips = async () => {
  //     try {
  //       const response = await axios.get('https://tripswebsite.onrender.com/api/trips/random4');
  //       setTrips(response.data);
  //     } catch (error) {
  //       console.error('Error fetching trips:', error);
  //     }
  //   };

  //   fetchTrips();
  // }, []);

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
  function toggleWidth() {
    var button = document.getElementById("contactButton");
    var contactInfo = document.getElementById("contactInfo");

    if (button.style.width === "100px") {
      button.style.width = "200px"; // Expanded width
      contactInfo.style.display = "block"; // Show contact info
    } else {
      button.style.width = "100px"; // Initial width
      contactInfo.style.display = "none"; // Hide contact info
    }
  }
  return (
    <>
      <Header />
      <Carousel />
      <AboutUs />
      <hr />
      <h2 className="text-center title-category" >Egypt & Hurghada Excurions , Tours & Activities</h2>
      <Row className="categories">
      <Col sm={6} xs={12} md={4} lg={3} className="text-center p-2">
        <div className="category" style={{ backgroundImage: `url(${image1})` }}>
          <h3>Excurions from Hurghada</h3>
          <Link to="/category1"><Button variant="primary">More Details</Button></Link>
        </div>
      </Col>

      <Col sm={6} xs={12} md={4} lg={3} className="text-center p-2">
        <div className="category" style={{ backgroundImage: `url(${image2})` }}>
          <h3>Excursions from Marsa Alam</h3>
          <Link to="/category2"><Button variant="primary">More Details</Button></Link>
        </div>
      </Col>

      <Col sm={6} xs={12} md={4} lg={3} className="text-center p-2">
        <div className="category" style={{ backgroundImage: `url(${image3})` }}>
          <h3>Excursions from El- Quseir</h3>
          <Link to="/category3"><Button variant="primary">More Details</Button></Link>
        </div>
      </Col>
      <Col sm={6} xs={12} md={4} lg={3} className="text-center p-2">
        <div className="category" style={{ backgroundImage: `url(${image4})` }}>
          <h3>Safaga Shore Excursions</h3>
          <Link to="/category4"><Button variant="primary">More Details</Button></Link>
        </div>
      </Col>
      </Row>
      <Container className="text-center mt-5">
        <div className="contact-container">
          <button
            className="contact-button"
            id="contactButton"
            onClick={toggleWidth}
          >
            {t("contact")}
          </button>

          <div className="contact-info" id="contactInfo">
            <p>
              <i className="fas fa-phone"></i> Phone:{" "}
              <a href="tel:+01091066075">+01091066075</a>
            </p>
            <p>
              <i className="fab fa-whatsapp"></i> WhatsApp:{" "}
              <a href="https://wa.me/+201091066075">WhatsApp</a>
            </p>
            <p>
              <a href="https://www.facebook.com/profile.php?id=61556796441526&mibextid=ZbWKwL">
                Facebook1
              </a>
            </p>
            <p>
              <a href="https://www.facebook.com/profile.php?id=61556532244644&mibextid=ZbWKwL">
                Facebook2
              </a>
            </p>
            <p>
              <a href="https://www.instagram.com/hurghada_sky_high_trips?igsh=ZDNvaDVreG9tcHgw">
                Instagram
              </a>
            </p>
            <p>
              {" "}
              <a href="mailto:hurghadaskyhightrips@gmail.com">email</a>
            </p>
          </div>
        </div>

        <span className="mt-5 d-block aboutUs">{t("ourServices")}</span>
        <h2>{t("discoverServices")}</h2>
        <p className="mb-5">{t("discoverServicesDescription")}</p>
      </Container>

      <Container>
        <Row className="mt-5 mb-5">
          <Col
            sm={6}
            xs={12}
            md={4}
            className="text-center contentServiecs p-2"
          >
            <FontAwesomeIcon icon={faBookmark} className="icon" />
            <h4>{t("bookNow")}</h4>
            <p>{t("bookNowDescription")}</p>
          </Col>
          <Col
            sm={6}
            xs={12}
            md={4}
            className="text-center contentServiecs p-2"
          >
            <FontAwesomeIcon icon={faFaceGrinWink} className="icon" />
            <h4>{t("fitAndFamily")}</h4>
            <p>{t("fitAndFamilyDesc")}</p>
          </Col>

          <Col
            sm={6}
            xs={12}
            md={4}
            className="text-center contentServiecs p-2"
          >
            <FontAwesomeIcon icon={faBookmark} className="icon" />
            <h4>{t("Excursions")}</h4>
            <p>{t("ExcursionsDesc")}</p>
          </Col>

          <Col
            sm={6}
            xs={12}
            md={4}
            className="text-center contentServiecs p-2"
          >
            <FontAwesomeIcon icon={faBookmark} className="icon" />
            <h4>{t("Transfers")}</h4>
            <p>{t("TransfersDesc")}</p>
          </Col>

          <Col
            sm={6}
            xs={12}
            md={4}
            className="text-center contentServiecs p-2"
          >
            <FontAwesomeIcon icon={faAddressBook} className="icon" />
            <h4>{t("tailorMade")}</h4>
            <p>{t("tailorMadeDesc")}</p>
          </Col>

          <Col
            sm={6}
            xs={12}
            md={4}
            className="text-center contentServiecs p-2"
          >
            <FontAwesomeIcon icon={faHandHoldingHeart} className="icon" />
            <h4>{t("insurance")}</h4>
            <p>{t("insuranceDesc")}</p>
          </Col>
        </Row>
      </Container>

      <Container>
      <h2 className="text-center">Discover Egypt</h2>
        <Row className="mt-5 mb-5">
          {trips.length > 0 ? (
          
            trips.map((trip) => (
              
              <div
                key={trip.id}
                className="col-sm-6 col-xs-12 col-md-4 col-lg-4 text-center p-2"
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
                      <span>{t("duration")}:</span>{" "}
                      <span className="statusTravel">{trip.duration}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center justify-content-around">
                      <span>{t("vehicle")}:</span>{" "}
                      <span className="statusTravel">{trip.vehicle}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center justify-content-around">
                      <span>{t("guiding")}:</span>{" "}
                      <span className="statusTravel">{trip.gudinjg}</span>
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                    <Link to={`/detaileTrip/${trip.id}`}>
                      <button className="btn btn-primary">
                        {t("moreDetails")}
                      </button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <h2 className="text-center">{t("noTrips")}</h2>
          )}
        </Row>
      </Container>

      <Link to="/ourTrips" style={{ textDecoration: "none" }}>
        <button className="btn btn-outline-primary me-auto ms-auto d-block">
          {t("discoverNow")}
        </button>
      </Link>
      <hr />
      <Blog />
      <Footer />
    </>
  );
};

export default Home;
