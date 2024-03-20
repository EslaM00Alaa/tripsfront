import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../db/api";
import "./Header.css"
export default function SignIn() {
  const [formData, setFormData] = useState({ mail: '', pass: '' });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);

      const response = await api.post("/account/login", formData);
      localStorage.setItem("token",response.data.token)
      localStorage.setItem("role",response.data.role)
      console.log("Login Done !!!!!!!!!!!");
      console.log(response.data);
      setLoading(false);
      if (response.data.success === false) {
        setError(true);
        return;
      }
      // Redirect based on user's role
      if (response.data.role === 'admin') {
        navigate('/addTrip'); // Redirect to admin home page
      } else {
        navigate('/'); // Redirect to regular home page
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <>
      <div className=' p-3  body'>
        <form onSubmit={handleSubmit} className='d-flex flex-column gap-4  form p-2'>
        <h2 className='text-center display-4 my-3'>Sign In</h2>
          <input
            type='email'
            placeholder='Email'
            id='mail'
            className='form-control'
            value={formData.mail}
            onChange={handleChange}
          />
          <input
            type='password'
            placeholder='Password'
            id='pass'
            className='form-control'
            value={formData.pass}
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className='btn btn-primary mt-3'
          >
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <div className='d-flex gap-2 mt-2'>
          <p>Don't have an account?</p>
          <Link to='/signup' className='text-decoration-none'>
            <span className='text-primary'>Sign up</span>
          </Link>
        </div>
        {error && <p className='text-danger mt-3'>Something went wrong!</p>}

        </form>
    
      </div>
    </>
  );
}