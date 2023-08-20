import React, { useState } from 'react'
import { Box, AppBar, Toolbar, Button, Tabs, Tab, Typography } from "@mui/material"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { authActions } from '../Store';
import toast from 'react-hot-toast';



const Header = ({username}) => {
    const navigate = useNavigate();

    let isLogin = useSelector(state => state.isLogin)

    isLogin =  isLogin || localStorage.getItem('userId')
    const dispatch = useDispatch();
    const [value, setValue] = useState()
    
   

    function logout() {

        dispatch(authActions.logout())
        toast.success("Logout Successfully")
        navigate("/login")
        localStorage.clear()
    }




    return (<>
         <AppBar className='appbar' position="sticky">
        <Toolbar>
          <Typography className='blog-app-heading' variant="h3" textColor="#fff" fontSize={"1.75rem"}> Blog App</Typography>
          {isLogin && (
            <Box display={"flex"} marginLeft="auto" marginRight={"auto"}>
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
              >
                <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                <Tab
                  label="Create Blog"
                  LinkComponent={Link}
                  to="/create-blogs"
                />
              </Tabs>
            </Box>
          )}
          <Box display={"flex"} marginLeft="auto">
            {!isLogin && (
              <>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  sx={{ margin: 1, color: "white" }}
                  LinkComponent={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <>
              <Typography variant="h3" textColor="#fff" fontSize={"1.75rem"}>{username}</Typography>
              <Button onClick={logout} sx={{ margin: 1, color: "white" }}>
                Logout
              </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
    )
}

export default Header
