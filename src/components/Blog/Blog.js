import React, { useState, useEffect } from 'react';
import api from '../db/api';
import "./Blog.css"
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Form from 'react-bootstrap/Form';

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    image: '',
    description: '',
    date: ''
  });

  useEffect(() => {
    api.get("/blogs")
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
      });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (blog) => {
    setSelectedBlog(blog);
    setShow(true);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      await api.post('/blogs', formData);
      // Reset form data after successful submission
      setFormData({
        image: '',
        description: '',
        date: ''
      });
      // Fetch updated blogs after adding a new one
      const response = await api.get("/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error('Failed to add blog:', error);
    }
  };

  return (
    <>
      <Container className="text-center mt-5">
        <span className="mt-5 d-block aboutUs">ARABIANTRAVEL BLOG</span>
        <h2>Our Blog & Event</h2>
        <Row className="mt-5 mb-5">
          {blogs.map(blog => (
            <Col xs={12} lg={4} className="text-center p-2" key={blog.id}>
              <Card>
                <Card.Img variant="top" src={blog.image} className="heightImageCard" />
                <Card.Body>
                  <Card.Text>{blog.description}</Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroup.Item className="d-flex align-items-center justify-content-around">
                    <span>Date:</span>{" "}
                    <span className="statusTravel">{blog.date}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          ))}
        </Row>
    
      </Container>
    </>
  )
}

export default Blog;
