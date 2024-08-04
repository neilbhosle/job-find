import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Button, IconButton, Menu, MenuItem, Avatar, Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import LoginPopup from './LoginPopup';
import SignUpPopup from './SignupPopup';
import { useTheme } from '@mui/material/styles';

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: '#000',
  borderRadius: '12px',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  marginLeft: theme.spacing(2),
  cursor: 'pointer',
  '&:hover': {
    background: 'transparent',
    color: '#7788EE',
    textShadow: '0 0 6px #7788EE',
  },
}));

const SignupButton = styled(Button)(({ theme }) => ({
  background: '#000',
  color: 'white',
  borderRadius: '12px',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  marginLeft: theme.spacing(2),
  cursor: 'pointer',
  '&:hover': {
    background: '#7788EE',
    color: '#fff',
    textShadow: '0 0 6px #7788EE',
  },
}));

const FeaturesButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: '#000',
  borderRadius: '12px',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  marginLeft: theme.spacing(2),
  cursor: 'pointer',
  '&:hover': {
    background: 'transparent',
    color: '#212e7c',
    textShadow: '0 0 6px #7788EE',
  },
}));

const CustomMenu = styled(Menu)(({ theme }) => ({
  borderRadius: '8px',
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#e2e6ff',
  },
}));

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [openSignUpPopup, setOpenSignUpPopup] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const theme = useTheme();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  const handleLoginClick = () => {
    setOpenLoginPopup(true);
  };

  const handleSignUpClick = () => {
    setOpenSignUpPopup(true);
  };

  const handleCloseLoginPopup = () => {
    setOpenLoginPopup(false);
  };

  const handleCloseSignUpPopup = () => {
    setOpenSignUpPopup(false);
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    handleCloseLoginPopup();
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: scrolled ? 'white' : 'transparent',
          boxShadow: scrolled ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
          transition: 'background 0.3s, box-shadow 0.3s',
          zIndex: 1100
        }}
      >
        <Toolbar>
          <img
            src="/jobdope-2.png"
            alt="Jobdope"
            style={{ height: '60px', marginRight: '20px' }}
          />
          <FeaturesButton
            color="inherit"
            onClick={handleClick}
            endIcon={<ExpandMoreIcon />}
          >
            Features
          </FeaturesButton>
          <CustomMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <CustomMenuItem onClick={handleClose}>AI Job Match</CustomMenuItem>
            <CustomMenuItem onClick={handleClose}>H1B Sponsors</CustomMenuItem>
            <CustomMenuItem onClick={handleClose}>5-Second Resume</CustomMenuItem>
            <CustomMenuItem onClick={handleClose}>Resume Customization</CustomMenuItem>
          </CustomMenu>
          <GradientButton>Resume AI</GradientButton>
          <GradientButton>About Us</GradientButton>
          <GradientButton>Blog</GradientButton>
          <GradientButton>Pricing</GradientButton>
          <div style={{ flexGrow: 1 }} />
          {loggedIn ? (
            <>
              <Tooltip title="User Menu">
                <IconButton onClick={handleUserMenuClick}>
                  <Avatar
                    sx={{
                      bgcolor: '#7788EE',
                      width: 40,
                      height: 40,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                    }}
                  >
                    <MenuIcon sx={{ color: 'white' }} />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={userMenuAnchorEl}
                open={Boolean(userMenuAnchorEl)}
                onClose={handleUserMenuClose}
              >
                <MenuItem onClick={handleUserMenuClose}>Profile Settings</MenuItem>
                <MenuItem onClick={handleUserMenuClose}>Resumes Saved</MenuItem>
                <MenuItem onClick={handleUserMenuClose}>Jobs Applied</MenuItem>
                <MenuItem onClick={handleUserMenuClose}>Payments</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <GradientButton onClick={handleLoginClick}>Login</GradientButton>
              <SignupButton onClick={handleSignUpClick}>Signup</SignupButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <LoginPopup open={openLoginPopup} onClose={handleCloseLoginPopup} onLoginSuccess={handleLoginSuccess} />
      <SignUpPopup open={openSignUpPopup} onClose={handleCloseSignUpPopup} />
    </>
  );
}

export default Navbar;
