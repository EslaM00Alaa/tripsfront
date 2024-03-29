import React, { useState } from "react";
import api from "../../components/db/api";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import { Container, Form, Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import { faFileVideo } from "@fortawesome/free-solid-svg-icons";
const AddTrip = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [gudinjg, setGudinjg] = useState("");
  const [video, setVideo] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (type === "Choose Type of Trip ....") {
      alert("Please select a trip type before submitting");
      return; 
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false || !image) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
console.log(type)
    const formData = new FormData();
    formData.append("description", description);
    formData.append("name", name);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("duration", duration);
    formData.append("vehicle", vehicle);
    formData.append("gudinjg", gudinjg);
    formData.append("type", type);
    formData.append("video", video);

    try {

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          token: `${token}`,
        },
      }; 
      await api.post("/trips", formData, config);

      alert("Trip added successfully");
      navigate("/allTrips");
      // Reset form fields
      setDescription("");
      setName("");
      setPrice("");
      setDuration("");
      setImage(null);
      setVehicle("");
      setGudinjg("");
      setType("");
      setVideo("")
      setUploadProgress(0);
      setValidated(false);
    } catch (error) {
      console.error("Error adding Trips:", error);
    }
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
  };
  return (
    <>
      <Header />
      <SideBar />
      <div className="pt-3 pb-2 mb-3 ">
        <Container>
          <h2 className="text-center">Add New Trip</h2>
          <Form validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name..."
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Price :</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Price..."
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Vehicle :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Vehicle..."
                  name="vehicle"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Guiding :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Guiding..."
                  name="gudinjg"
                  value={gudinjg}
                  onChange={(e) => setGudinjg(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label>Duration :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Duration..."
                  name="duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group as={Col} md="12">
                <Form.Label>Description For Trips :</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={7}
                  placeholder="Your Message"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-between align-items-center mb-4 uploadimageselection">
              <Form.Group as={Col} md="5" className="mt-3">
                <Form.Label>Select Image:</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleImageUpload}
                  required
                />
              </Form.Group>
              {uploadProgress > 0 && (
                <ProgressBar
                  now={uploadProgress}
                  label={`${uploadProgress}%`}
                />
              )}
              <Form.Group as={Col} md="5" className="mt-3">
                <Form.Label>Select Category:</Form.Label>

                <Form.Select   value={type}
                  onChange={(e) => setType(e.target.value)}
                  required>
            
               <option>Choose Type of Trip ....</option>
                  <option value="1">Excurions from Hurghada</option>
                  <option value="2">Excursions from Marsa Alam</option>
                  <option value="3">Excursions from El- Quseir</option>
                  <option value="4">Safaga Shore Excursions</option>
                </Form.Select>
              </Form.Group>
            </div>
            <Form.Group as={Col} md="12">
                <Form.Label>Video :</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="URL..."
                  name="video"
                  value={video}
                  onChange={(e) => setVideo(e.target.value)}
                  required
                />
              </Form.Group>
            <Button type="submit" className="mt-3 mb-5">
              Add Trip
            </Button>
          </Form>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default AddTrip;
