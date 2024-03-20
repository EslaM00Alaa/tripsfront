import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../components/db/api';
import { Container, Form, Button } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import {  useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
function UpdateCurrentTrip() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [tripData, setTripData] = useState({
    name: '',
    price: 0,
    vehicle: '',
    gudinjg: '',
    duration: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTripData = async () => {
      try {
        const response = await api.get(`/trips/trip/${id}`);
        const trip = response.data.trips[0];
        setTripData({
          name: trip.name,
          price: trip.price,
          vehicle: trip.vehicle, 
          gudinjg: trip.gudinjg, 
          duration: trip.duration,
          description: trip.description
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trip details:', error);
        setLoading(false);
      }
    };

    fetchTripData();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setTripData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        token: `${token}`,
          // authorization: `Bearer ${token}`
      }
    };
   api.put(`/trips/${id}`, tripData,config).then(()=>{
    alert('Trip updated successfully!');
    navigate("/allTrips")
   }).catch (error=>{    console.error('Error updating trip:', error);
   alert('Failed to update trip.');}) 
  
    
  };

  return (
<>
<Header />
    <Container>

      <h2 className="text-center">Update Trip</h2>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={tripData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPrice">
            <Form.Label>Price :</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={tripData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formVehicle">
            <Form.Label>Vehicle :</Form.Label>
            <Form.Control
              type="text"
              name="vehicle"
              value={tripData.vehicle}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formGuiding">
            <Form.Label>Guiding :</Form.Label>
            <Form.Control
              type="text"
              name="gudinjg"
              value={tripData.gudinjg}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDuration">
            <Form.Label>Duration :</Form.Label>
            <Form.Control
              type="text"
              name="duration"
              value={tripData.duration}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description :</Form.Label>
            <Form.Control
              as="textarea"
              rows={7}
              name="description"
              value={tripData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="my-3">
            Update
          </Button>
        </Form>
      )}
    </Container>
    <Footer />
</>
  );
}

export default UpdateCurrentTrip;
