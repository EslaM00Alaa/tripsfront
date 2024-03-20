import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../db/api";

export default function SignUp() {
  const [formData, setFormData] = useState({});
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

      const response = await api.post('/account/register', {
        name: formData.username,
        mail: formData.email,
        pass: formData.password
      });

  
      console.log(response.data);
      setLoading(false);
      if (response.data.success === false) {
        setError(true);
        return;
      }
      navigate('/login');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className=' p-3 body'>
      <form onSubmit={handleSubmit} className='d-flex flex-column gap-4 form p-2'>
      <h2 className='text-center display-4 my-2'>Sign Up</h2>
        <input
          type='text'
          placeholder='Username'
          id='username'
          className='form-control'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          className='form-control'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          id='password'
          className='form-control'
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className='btn btn-primary mt-3'
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <div className='d-flex gap-2 mt-3'>
        <p>Already have an account?</p>
        <Link to='/login' className='text-decoration-none'>
          <span className='text-primary'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-danger mt-3'>Something went wrong!</p>}

      </form>
  
    </div>
  );
}