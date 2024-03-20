import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../components/db/api';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import noResultsImage from "../../images/notfound.jpeg";
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query');

  useEffect(() => {
    api.get(`/trips/search/${query}`)
      .then((response) => {
        setSearchResults(response.data.trips);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        setLoading(false);
      });
  }, [query]);

  return (
    <>
    <Header />
      <Container>
        <Row className="mt-5 mb-5">
          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : searchResults.length === 0 ? (
            <Col className="text-center">
              <img src={noResultsImage} alt="No results" className="no-results-image" />
              <h2>No results available.</h2>
            </Col>
          ) : (
            searchResults.map((result, index) => (
              <Col sm={6} xs={12} md={4} key={index} className="text-center p-2">
                <Card>
          
                        <Card.Img
                    variant="top"
                    src={ result.image}
                    className="heightImageCard"
                  />
                  <Card.Body>
                    <Card.Text className="fs-3">{result.name}</Card.Text>
                  </Card.Body>

                  <ListGroup className="list-group-flush">
                    <ListGroup.Item>
                      <span className="price">{result.price}$</span>/Per person
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center justify-content-around">
                      <span>Duration:</span>{" "}
                      <span className="statusTravel">{result.duration}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center justify-content-around">
                      <span>Vehicle:</span>{" "}
                      <span className="statusTravel">{result.vehicle}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex align-items-center justify-content-around">
                      <span>Guiding:</span> <span className="statusTravel">{result.gudinjg}</span>
                    </ListGroup.Item>
                  </ListGroup>
                  <Card.Body>
                  <Link to={`/detaileTrip/${result.id}`}>
                      <button className="btn btn-primary">MORE DETAILS</button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))
            
          )}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default SearchPage;
