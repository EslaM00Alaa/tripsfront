import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../db/api";
import Swal from "sweetalert2";
import "./Header.css";

export default function Check() {
  const [mail, setMail] = useState("");

  const navigate = useNavigate();

  async function sendVerificationCode() {
    try {
      await api.post("/account/verifycode", {
        mail
      });

      Swal.fire({
        icon: 'success',
        title: 'Code Resent Successfully!',
        text: 'Please check your email for the new code.',
      });
      navigate(`/resetpass/${mail}`);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'No account found with this email',
        text: "Go To Create A New Account",
      });
      navigate('/signup');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendVerificationCode();
  };

  return (
    <div className="p-3 body">
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-4 form p-2">
        <h2 className="text-center display-4 my-3">ENTER YOUR EMAIL</h2>
        <input
          type="email"
          placeholder="Email"
          id="mail"
          className="form-control"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-3">
          Send Verify Code
        </button>
      </form>
    </div>
  );
}
