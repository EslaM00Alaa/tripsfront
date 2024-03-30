import React, { useState } from "react";
import api from "../../components/db/api";
import "./ContactUs.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {  useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

const ContactUs = () => {

  const navigate = useNavigate();
  if(!localStorage.getItem("active"))
        {
          navigate("/active");
        }

  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    description: "",
  });

  const handleInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/contactus", formData);
      console.log("Message sent successfully!", response);
      // Reset form data after successful submission
      setFormData({
        name: "",
        mail: "",
        description: "",
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const { t } = useTranslation();
  return (
    <>
      <Header />
      <Container>
        <Row className="mt-5 mb-5">
          <Col sm={6} xs={12} className="text-center p-2">
            <p className="fs-5">{t("hearFromYou")}</p>
            <div className="contactEmail">
              <span> {t("")} </span>
              <span className="me-4 fs-5">{t("E-mail :")}</span>
              <span className="contact-email fs-5">
               hurghadaskyhightrips@gmail.com
              </span>
            </div>
          </Col>
          <Col sm={6} xs={12} className="text-center p-2">
            <Form className="m-3 btnSubmit" onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Control
                    name="name"
                    value={formData.name}
                    onChange={handleInput}
                    placeholder={t("Your Name")}
                  />
                </Col>
                <Col>
                  <Form.Control
                    name="mail"
                    value={formData.mail}
                    onChange={handleInput}
                    type="email"
                    placeholder={t("Your E-mail")}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Control
                    name="description"
                    value={formData.description}
                    onChange={handleInput}
                    as="textarea"
                    rows={7}
                    placeholder={t("Your Message")}
                    className="mt-3"
                  />
                </Col>
              </Row>
              <Button
                variant="primary"
                type="submit"
                className="m-3 btnSubmit ms-0"
              >
                {t("Submit")}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ContactUs;