import React, { useState } from "react";
import { useParams, useNavigate ,Link } from "react-router-dom";
import api from "../db/api";
import Swal from "sweetalert2";
import "./Header.css";

export default function RestPass() {
  const [code, setCode] = useState("");
  const [pass, setPass] = useState("");
  const { mail } = useParams(); // Retrieve mail from URL parameters
  const navigate = useNavigate();

  const restPass = async () => {
    try {
      if (!mail) {
        throw new Error('Mail parameter not found.');
      }
      
      const response = await api.post("/account/resetpass", {
        mail,
        code,
        pass
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Password Changed',
          text: 'You can now log in with your new password.',
        });
        navigate(`/login`);
      } else {
        throw new Error('Unexpected response from server.');
      }
    } catch (error) {
      let errorMessage = 'Password Change Failed';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await restPass();
  };

  return (
    <div className="p-3 body">
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-4 form p-2">
        <h2 className="text-center display-4 my-3">Change Password</h2>
        <input
          type="text"
          placeholder="Verification Code"
          id="vcode"
          className="form-control"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          id="npass"
          className="form-control"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
         <div className="d-flex gap-2 ">
         <p>Correct The Email</p>
         <Link to="/check" className="text-decoration-none">
            <span  className="text-primary pointer ">Click here</span>
         </Link>
          </div>
        <button type="submit" className="btn btn-primary mt-3">
          Change Password
        </button>
      </form>
    </div>
  );
}
