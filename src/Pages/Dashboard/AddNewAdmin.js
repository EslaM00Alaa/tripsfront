import React, { useState } from 'react';
import api from '../../components/db/api';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import { Container, Form, Button } from 'react-bootstrap';


import Footer from '../../components/Footer/Footer';
const AddNewAdmin = () => {

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false ) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const formData = {
        name,
        mail,
        pass
      };

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          token: `${token}`,
        },
      };
      const response = await api.post('/account/registerAdmin', formData, config);

      console.log(response.data);
      alert('Admin added successfully');

      // Reset form fields
      setName('');
      setMail('');
      setPass('');
      setValidated(false);
    } catch (error) {
      console.error('Error adding Admin:', error);
    }
  };


  return (
    <>
      <Header />
      <SideBar />
      <div className="pt-3 pb-2 mb-3 ">
                <Container>
                  <h2 className="text-center">Add New Admin</h2>
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="mail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="pass">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please provide a password.
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        Add Admin
      </Button>
    </Form>
                </Container>
              </div>
    <Footer />
    </>
  );
};

export default AddNewAdmin;
