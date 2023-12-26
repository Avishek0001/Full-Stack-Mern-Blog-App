import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import toast from 'react-hot-toast';

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
      const response = await fetch("http://localhost:4000/api/v1/user/register", {
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
          <Typography variant='h4' padding={3} textAlign={'center'} marginBottom={5}>REGISTER</Typography>

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

          {/* <TextField placeholder='Name' value={inputs.name} onChange={handleChange} name='name' margin='normal' type='text' required /> */}
          {/* <TextField placeholder='Email' value={inputs.email} onChange={handleChange} name='email' margin='normal' type='email' required /> */}
          {/* <TextField placeholder='Password' value={inputs.password} onChange={handleChange} name='password' margin='normal' type='password' required /> */}

          <Button type='submit' sx={{ borderRadius: 3, marginTop: 3 }} variant='contained' color='primary'>Register</Button>
          <Button onClick={() => navigate('/login')} sx={{ borderRadius: 3, marginTop: 3 }}>Login</Button>

        </Box>

      </form>
    </>
  )
}

export default Register