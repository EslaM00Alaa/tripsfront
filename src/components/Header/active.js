import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../db/api";
import Swal from "sweetalert2";
import "./Header.css";

export default function Active() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  async function sendAgain() {
    const token = localStorage.getItem("token");
    
    try {
      await api.get("/account/sendagain", {
        headers: {
          token: `${token}`,
        }
      });
  
      Swal.fire({
        icon: 'success',
        title: 'Code Resent Successfully!',
        text: 'Please check your email for the new code.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Code Resend Failed',
        text: error.response.data.message || 'An error occurred while resending the code.',
      });
    }
  }

  async function activAccount(e) {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const token = localStorage.getItem("token");
      await api.post("/account/active", { code }, {
        headers: {
          token: `${token}`,
        },
      });
      Swal.fire({
        icon: 'success',
        title: 'Account Activated Successfully!',
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/'); // Redirect to home page after successful activation
      localStorage.setItem("active",true);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Activation Failed',
        text: error.response.data.message // Display error message received from API
      });
    }
  }

  return (
    <>
      <div className="p-3 body">
        <form className="d-flex flex-column gap-4 form p-2">
          <h2 className="text-center display-4 my-3">ACTIVATE YOUR ACCOUNT</h2>
          <input
            type="text"
            placeholder="CODE"
            id="vcode"
            className="form-control"
            onChange={(e) => setCode(e.target.value)}
          />
          <div className="d-flex gap-2 ">
            <p>Didn't receive the code?</p>
            <span onClick={()=>sendAgain()} className="text-primary pointer ">Click here to resend</span>
          </div>
          <button onClick={activAccount} className="btn btn-primary mt-3">
            OK
          </button>
        </form>
      </div>
    </>
  );
}


