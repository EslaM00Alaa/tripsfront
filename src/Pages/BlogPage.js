import React from 'react'
import Header from '../components/Header/Header'
import Blog from '../components/Blog/Blog'
import Footer from '../components/Footer/Footer'
import { useNavigate } from "react-router-dom";
function BlogPage() {
const navigate = useNavigate();
  if(!localStorage.getItem("active"))
        {
          navigate("/active");
        }
  return (
    <>
    <Header />
  <Blog />
  <Footer />
      
    </>
  )
}

export default BlogPage
