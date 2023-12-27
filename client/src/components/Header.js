import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Button, Tabs, Tab, Typography } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../Store';
import toast from 'react-hot-toast';
import photo from "../photos/logo.png"



const Header = ({ username }) => {
  const navigate = useNavigate();

  let isLogin = useSelector(state => state.isLogin)

  isLogin = isLogin || localStorage.getItem('userId')
  const dispatch = useDispatch();
  const [value, setValue] = useState()



  function logout() {

    dispatch(authActions.logout())
    toast.success("Logout Successfully")
    navigate("/login")
    localStorage.clear()
  }




  return (<>


    <nav className='navbar' >

      <img className='logo-photo' src={photo} />
      <h3 className='blog-app-heading'> Blog App</h3>
      {isLogin && (
        <div className='button-container'>
          <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)} >
            <Link to="/blogs" style={{ color: "#000" }}>
              <button className='blog-buttons btn btn-outline-dark' >All Blogs</button>
            </Link>
            <Link to="/my-blogs" className='blog-buttons' style={{ color: "#000" }}>
              <button className='blog-buttons btn btn-outline-dark'>My Blogs</button>
            </Link>
            <Link to="/create-blogs" style={{ color: "#000" }}>
              <button className='blog-buttons btn btn-outline-dark'>Create Blogs</button>
            </Link>

          </Tabs>
        </div>

      )}
      
      <Box display={"flex"} marginLeft="auto">
        {!isLogin && (
          <>
          <Link to="/login" style={{ margin: 1, color: "#000"}}>

            <button className='btn btn-outline-dark login-logout'>
              Login
            </button>
              </Link>
          <Link to="/register" style={{ marginLeft: "20px",marginRight:"10px", color: "#000"}}>

            <button className='btn btn-outline-dark login-logout'>
              Register
            </button>
              </Link>

            
          </>
        )}
        {isLogin && (
          <>
            <h2 style={{ color: "#000" }}>{username}</h2>
            <button className='btn btn-outline-dark login-logout' onClick={logout} sx={{  color: "black" }}>
              Logout
            </button>
          </>
        )}
      </Box>

    </nav>

  </>
  )
}

export default Header
