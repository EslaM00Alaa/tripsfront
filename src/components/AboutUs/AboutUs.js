import React from "react";
import { useTranslation } from "react-i18next";
import "./AboutUs.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import about1 from "../../images/cat7.jpg";
import about2 from "../../images/cat9.jpg";

function AboutUs() {
  const { t } = useTranslation();

  return (
    <>
      <Container>
        <Row className="mt-5 mb-5 ">
          <Col sm={6} xs={12} md={4}>
            <span className="mt-5 d-block aboutUs">{t("aboutUs")}</span>
            <h2>{t("arabianTravelService")}</h2>
            <p>{t("exploreDestinations")}</p>
          </Col>
          <Col sm={6} xs={12} md={4}>
            <img src={about1} alt="" className="w-100 imageAbout m-2" />
          </Col>
          <Col sm={6} xs={12} md={4}>
            <img src={about2} alt="" className="w-100 imageAbout m-2" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AboutUs;
