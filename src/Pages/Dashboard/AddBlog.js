import React, { useState } from 'react';
import "./Dashboard.css"
import Header from '../../components/Header/Header'
import SideBar from '../../components/SideBar/SideBar'
import { Container, Form, Button, ProgressBar } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import api from '../../components/db/api';
import Footer from '../../components/Footer/Footer';

function AddBlog() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [inputDate, setInputDate] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false || !image) {
  //     event.stopPropagation();
  //     setValidated(true);
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append('date', inputDate);
  //   formData.append('description', inputDescription);
  //   formData.append('image', image);

  //   try {
  //      await api.post('/blogs', formData ,{
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }})
  //     alert('Blog added successfully');
  
  //     navigate("/allBlogs")
  //     // Reset form fields
  //     setInputDate('');
  //     setInputDescription('');
  //     setImage(null);
  //     setUploadProgress(0);
  //     setValidated(false);
  //   } catch (error) {
  //     console.error('Error adding blog:', error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false || !image) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
  
    const formData = new FormData();
    formData.append('date', inputDate);
    formData.append('description', inputDescription);
    formData.append('image', image);
  
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          token: `${token}`,
        },
      };
      await api.post('/blogs', formData, config);
      alert('Blog added successfully');
      navigate("/allBlogs");
      setInputDate('');
      setInputDescription('');
      setImage(null);
      setUploadProgress(0);
      setValidated(false);
    } catch (error) {
      console.error('Error adding blog:', error);
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
    
        <Container>
        <div className="pt-3 pb-2 mb-3 p-3">
                <h2 className="text-center">Add New Blog</h2>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        placeholder="date..."
                        value={inputDate}
                        onChange={e => setInputDate(e.target.value)}
                      />
                      <Form.Control.Feedback>Very Good!!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="my-3">
                    <Form.Group as={Col} md="12" controlId="validationCustom04">
                      <Form.Label>Description For Blog</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={7}
                        placeholder="Your Message"
                        className="mt-3"
                        value={inputDescription}
                        onChange={e => setInputDescription(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please Enter Description for Blog
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Container>
                    <Form.Group controlId="formFileSingle" className="mb-3">
                      <Form.Label>Select Image</Form.Label>
                      <Form.Control type="file" onChange={handleImageUpload} required />
                    </Form.Group>
                    {uploadProgress > 0 && <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />}
                  </Container>
                  <Button type="submit" className="mt-3">Add Blog</Button>
                </Form>
              </div>
        </Container>
              <Footer />
  
    </>
  )
}

export default AddBlog;
