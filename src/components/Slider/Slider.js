import React from "react";
import "./Slider.css";

import Carousel from "react-bootstrap/Carousel";
import imageSlide1 from "../../images/hero-1.webp";
import imageSlide2 from "../../images/7.avif";
import imageSlide3 from "../../images/10.avif";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
function Slider() {
  const { t } = useTranslation();

  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block slideImage w-100"
            src={imageSlide1}
            alt="First slide"
          />
          <Carousel.Caption className="carousel">
            <h3 className="mainHeader">{t("discoverWorld")}</h3>
            <p className="fs-4">{t("welcomeMessage")}</p>
            <Link to="/ourTrips">
              {" "}
              <button className="btn btn-primary">{t("discoverNow")}</button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block slideImage w-100"
            src={imageSlide2}
            alt="Second slide"
          />
          <Carousel.Caption className="carousel">
            <h3 className="mainHeader">{t("discoverWorld")}</h3>
            <p className="fs-4">{t("welcomeMessage")}</p>
            <button className="btn btn-primary">{t("discoverNow")}</button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block slideImage w-100"
            src={imageSlide3}
            alt="Third slide"
          />
          <Carousel.Caption className="carousel">
            <h3 className="mainHeader">{t("discoverWorld")}</h3>
            <p className="fs-4">{t("welcomeMessage")}</p>

            <Link to="/ourTrips">
              <button className="btn btn-primary">{t("discoverNow")}</button>
            </Link>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Slider;
