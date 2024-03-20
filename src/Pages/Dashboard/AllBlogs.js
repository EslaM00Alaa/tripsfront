import React, { useState, useEffect } from 'react';
import "./Dashboard.css"
import api from '../../components/db/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import Header from '../../components/Header/Header'
import SideBar from '../../components/SideBar/SideBar'
import Footer from '../../components/Footer/Footer';


function AllBlogs() {

  const [blogs, setBlogs] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        token: `${token}`,
      },
    };
    api.get("/blogs",config)
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

  const handleDelete = () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          token: `${token}`,
        },
      };
      api.delete(`/blogs/${selectedBlog.id}`, config)
        .then(response => {
          setBlogs(blogs.filter(blog => blog.id !== selectedBlog.id));
          handleClose();
        })
        .catch(error => {
          console.error('Error deleting blog:', error);
          handleClose();
        });
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
      handleClose();
    }
  };
  

  return (
    <>
      <Header />
      <SideBar />
      <div className="pt-3 pb-2 mb-3 ">
                <h2 className="text-center">All Blogs</h2>
                <Container>
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
                          <Card.Body>
                            {/* <Link to={`/updateBlog/${blog.id}`}><Button variant="primary">Update</Button></Link> */}
                            <Button variant="danger" onClick={() => handleShow(blog)} className="ms-2">Delete</Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </div>
  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are You Sure ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You Will Delete This Blog !!!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </>
  )
}

export default AllBlogs;
