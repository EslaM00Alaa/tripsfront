import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/logo1.jpeg";
import logoEru from "../../images/eru.png";
import logoEng from "../../images/eng.png";
import Form from "react-bootstrap/Form";

import i18n from "i18next";
import "./Header.css";
import {  useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en"); // افتراضي إلى الإنجليزية

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);


  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center ">
        <div className="d-flex lang ms-5 my-2 me-5">
          <img
            src={logoEng}
            alt="Switch to English"
            className="me-2"
            onClick={() => i18n.changeLanguage("en")}
            style={{ cursor: "pointer" }}
          />
          <img
            src={logoEru}
            alt="Switch to German"
            className="me-2"
            onClick={() => i18n.changeLanguage("de")}
            style={{ cursor: "pointer" }}
          />
        </div>

        {isLoggedIn ? (
              <div className="containerBtn">
        <Button variant="primary" size="sm" onClick={handleLogout}>
          Logout
        </Button>
        </div>
      ) : (
        <>
    <div className="containerBtn">
            <Link to="/login">
              <Button variant="primary" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="primary" className="ms-2" size="sm">
                Register
              </Button>
            </Link>
    </div>
        </>
      )}
      </div>

      <Container>
        <Navbar expand="lg" className="bg-body-tertiary mx-3">
          <Navbar.Brand href="/">
            <img src={logo} alt="" className="logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 w-75"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">{t("home")}</Nav.Link>
              <Nav.Link href="/about">{t("aboutUs")}</Nav.Link>
              <Nav.Link href="/blog">{t("blog")}</Nav.Link>
              <Nav.Link href="/ourTrips">{t("allTrips")}</Nav.Link>
              <Nav.Link href="/contact">{t("contact")}</Nav.Link>
              {/* <Nav.Link href="/addTrip">Dashboard</Nav.Link> */}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder={t("search")}
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Link to={`/search?query=${searchQuery}`}>
                <Button variant="primary">{t("search")}</Button>
              </Link>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
}

export default Header;
