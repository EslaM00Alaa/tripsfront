import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../components/db/api';
import { Container, Form, Button } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import ProgressBar from "react-bootstrap/ProgressBar";

function UpdateCurrentTrip() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [tripData, setTripData] = useState({
    name: '',
    price: 0,
    vehicle: '',
    gudinjg: '', // Changed field name
    duration: '',
    description: '',
    video: '', // Added video field
    image: null, // Added image field
  });

  const [loading, setLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);

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
          description: trip.description,
          video: trip.video, 
          image: null, 
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
  
    try {
      const formData = new FormData();
      formData.append('name', tripData.name);
      formData.append('price', tripData.price);
      formData.append('vehicle', tripData.vehicle);
      formData.append('gudinjg', tripData.gudinjg);
      formData.append('duration', tripData.duration);
      formData.append('description', tripData.description);  
    
        formData.append('video', tripData.video);
    
      if (tripData.image) {
        formData.append('image', tripData.image);
      }
  
      // Send formData instead of tripData
      await api.put(`/trips/${id}`, formData, config);
      alert('Trip updated successfully!');
      navigate("/allTrips");
    } catch (error) {
      console.error('Error updating trip:', error);
      alert('Failed to update trip.');
    }
  };
  

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setTripData(prevState => ({
      ...prevState,
      image: selectedFile
    }));
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
            {/* Form fields */}
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
            <Form.Group md="12">
              <Form.Label>Video :</Form.Label>
              <Form.Control
                type="text"
                placeholder="URL..."
                name="video"
                value={tripData.video}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group md="5" className="mt-3">
              <Form.Label>Select Image:</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageUpload}
              />
            </Form.Group>
            {uploadProgress > 0 && (
              <ProgressBar
                now={uploadProgress}
                label={`${uploadProgress}%`}
              />
            )}
            {/* Submit button */}
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
