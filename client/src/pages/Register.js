import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import toast from 'react-hot-toast';
import { baseUrl } from '../URL';
import logo from "../photos/logo.png"

const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
  })
  function handleChange(e) {
    setInputs(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`${baseUrl}/api/v1/user/register`, {
        method: "POST",
        body: JSON.stringify({
          username: inputs.name,
          email: inputs.email,
          password: inputs.password
        }),
        headers: { 'Content-Type': 'application/json' }
      })
      if (response.status === 201) {
        toast.success('registration successful');
        navigate("/login")
      } else {
        toast.success('registration failed');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box maxWidth={450}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          margin={'auto'}
          marginTop={5}
          boxShadow={"10px 10px 20px #ccc"}
          padding={5}
          borderRadius={5}
        >
          <img className='logo-photo' style={{ height: "60px", width: "50px", paddingBottom: "10px" }} src={logo} />
          <h3 className='blog-app-heading' style={{ paddingBottom: "10px" }}> Blog App</h3>


          <div className='field-group'>
            <span className='icon'>
              <i class="uil uil-user-square"></i>
            </span>
            <input
              className='input-field'
              type="text"
              placeholder='Full Name'
              value={inputs.name}
              onChange={handleChange}
              name="name"
              required
            />
          </div>

          <div className='field-group'>
            <span className='icon'>
              <i class="uil uil-at"></i>
            </span>
            <input
              className='input-field'
              type="email"
              placeholder='Email'
              value={inputs.email}
              onChange={handleChange}
              name="email"
              required
            />
          </div>
          <div className='field-group'>
            <span className='icon'>
              <i class="uil uil-key-skeleton-alt"></i>
            </span>
            <input
              className='input-field'
              type="password"
              placeholder='Password'
              value={inputs.password}
              onChange={handleChange}
              name="password"
              required
            />
          </div>

          <button type='submit' style={{ background: "#000", marginTop: "20px", width: "100px", borderRadius: "25px" }} variant='contained' >Register</button>
          <button onClick={() => navigate('/login')} style={{ background: "none", color: "#000", marginTop: "10px", fontWeight: "500" }}>Login</button>

        </Box>

      </form>
    </>
  )
}

export default Register