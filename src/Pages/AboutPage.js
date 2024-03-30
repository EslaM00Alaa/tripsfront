import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import AboutUs from '../components/AboutUs/AboutUs'
import {  useNavigate } from "react-router-dom";
function AboutPage() {
  const navigate = useNavigate();
  if(!localStorage.getItem("active"))
        {
          navigate("/active");
        }
  return (
    <>
    <Header />
  <AboutUs />
  <Footer />
      
    </>
  )
}

export default AboutPage
