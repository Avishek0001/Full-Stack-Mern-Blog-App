import React, {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Box,Typography,TextField,Button} from '@mui/material';
import { useDispatch } from 'react-redux';
import { authActions } from '../Store';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
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
    
  const response = await fetch("http://localhost:4000/api/v1/user/login", {
      method: "POST",
      body: JSON.stringify({        
        email: inputs.email,
        password: inputs.password
      }),
      headers: { 'Content-Type': 'application/json' },
      credentials:'include'
    })
    if (response.status === 201) {
      const data = await response.json()
      localStorage.setItem("userId", data?.user._id)
      dispatch(authActions.login())
      toast.success('Login successful');    
      navigate("/")      
    } else {
      toast.success('Login failed');
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
          <Typography variant='h4' padding={3} textAlign={'center'}>LOGIN</Typography>
          <TextField placeholder='Email' value={inputs.email} onChange={handleChange} name='email' margin='normal' type='email' required />
          <TextField placeholder='Password' value={inputs.password} onChange={handleChange} name='password' margin='normal' type='password' required />

          <Button type='submit' sx={{ borderRadius: 3, marginTop: 3 }} variant='contained' color='primary'>Login</Button>
          <Button onClick={() => navigate('/register')} sx={{ borderRadius: 3, marginTop: 3 }}>Create Account </Button>

        </Box>
        </form>
    </>
  )
}

export default Login