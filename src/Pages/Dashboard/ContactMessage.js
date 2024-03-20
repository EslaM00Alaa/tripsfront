import React, { useState, useEffect } from 'react';
import api from '../../components/db/api';
import "./Dashboard.css"
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import SideBar from '../../components/SideBar/SideBar'
import { Container, Form, Button  } from 'react-bootstrap';

import Col from 'react-bootstrap/Col';

import Row from 'react-bootstrap/Row';
function ContactMessage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        token: `${token}`,
      },
    };
    api.get('/contactus',config) 
      .then(response => {
        setContacts(response.data);
        console.log('Display All Contacts Done !!!!');
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
      });
  }, []);

  const deleteContact = (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          token: `${token}`,
        },
      };
      api.delete(`/contactus/${id}`, config)
        .then(response => {
          console.log('Contact deleted successfully');
          setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
        })
        .catch(error => {
          console.error('Error deleting contact:', error);
        });
    } catch (error) {
      console.error('Error getting token from localStorage:', error);
    }
  };
  

  return (
    <>
    <Header />
    <SideBar />
    <Container>
    <div className="pt-3 pb-2 mb-3 ">
    <h2 className="text-center">Contact US</h2>
    <Form>
                {contacts.map(contact => (
                  <Row key={contact.id} className="mb-3 p-3">
                    <Form.Group as={Col} md="3" controlId={`name_${contact.id}`}>
                      <Form.Label>Name :</Form.Label>
                      <Form.Control type="text" value={contact.name} readOnly />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId={`email_${contact.id}`}>
                      <Form.Label>E-mail : </Form.Label>
                      <Form.Control type="text" value={contact.mail} readOnly />
                    </Form.Group>
                    <Form.Group as={Col} md="3" controlId={`delete_${contact.id}`}>
                      <Button className="btn btn-danger deletecontact" onClick={() => deleteContact(contact.id)}>Delete</Button>
                    </Form.Group>
                    <Form.Group as={Col} md="12" controlId={`message_${contact.id}`} className="mt-2">
                      <Form.Label>Message from User : </Form.Label>
                      <Form.Control as="textarea" rows={7} value={contact.description} className="mt-3" readOnly />
                    </Form.Group>
                    <hr className="mt-4" />
                  </Row>
                ))}
              </Form>
          </div>
    </Container>
  <Footer />
    
    </>
  )
}

export default ContactMessage
