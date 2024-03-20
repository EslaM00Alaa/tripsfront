import React from "react";
import "./Footer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

import logoFooter from "../../images/arabian logo-footer.webp";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <Row className="  footer p-4 d-flex justify-content-between">
        <Col sm={4} xs={12} className="text-center  p-2">
          <p className="mt-4 mb-4">{t("discoverWorld")}</p>
          <Link
            to="https://www.facebook.com/profile.php?id=61556796441526&mibextid=ZbWKwL"
            className="social"
          >
            {" "}
            <FontAwesomeIcon icon={faFacebook} size="2xl" className="m-2" />
          </Link>
          <Link
            to="https://www.instagram.com/hurghada_sky_high_trips?igsh=ZDNvaDVreG9tcHgw"
            className="social"
          >
            {" "}
            <FontAwesomeIcon icon={faInstagram} size="2xl" className="m-2 " />
          </Link>
          <a href="mailto:hurghadaskyhightrips@gmail.com" className="social">
            {" "}
            <FontAwesomeIcon icon={faEnvelope} size="2xl" className="m-2 " />
          </a>

          <Link to="https://wa.me/+01091066075" className="social">
            {" "}
            <FontAwesomeIcon icon={faWhatsapp} size="2xl" className="m-2 " />
          </Link>
        </Col>
        <Col sm={4} xs={12} className=" p-2">
          <span className=" d-block aboutUs fs-5">{t("contactUs")}</span>
          <p className="mt-4 mb-4 fs-5">hurghadaskyhightrips@gmail.com</p>
          <Link to="/" style={{ textDecoration: "none" }} className="link">
            {t("termsConditions")}
          </Link>
        </Col>
      </Row>
      <Nav
        className="me-auto w-100 subfooter p-3"
        style={{ maxHeight: "100px" }}
        navbarScroll
      >
        <Nav.Link href="/" className="linkfooter">
          {t("home")}
        </Nav.Link>
        <Nav.Link href="/about" className="linkfooter">
          {" "}
          {t("aboutUs")}
        </Nav.Link>
        <Nav.Link href="/blog" className="linkfooter">
          {" "}
          {t("blog")}
        </Nav.Link>
        <Nav.Link href="/contact" className="linkfooter">
          {" "}
          {t("contact")}
        </Nav.Link>
      </Nav>
    </>
  );
}

export default Footer;
