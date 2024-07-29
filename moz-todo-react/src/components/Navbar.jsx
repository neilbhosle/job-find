import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import LoginPopup from './LoginPopup'; 
import SignUpPopup from './SignupPopup'; 

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: '#000', // Blue text color
  borderRadius: '12px', // Less round
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  marginLeft: theme.spacing(2), // Add margin to space out buttons
  '&:hover': {
    background: 'transparent',
    border: '2px solid #000',
    color: '#000',
    boxShadow: '0 0 10px rgba(0, 123, 255, 0.5)', // Blue glow
  },
}));

const SignupButton = styled(Button)(({ theme }) => ({
  background: '#000', // Blue background
  color: 'white',
  borderRadius: '12px', // Less round
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  marginLeft: theme.spacing(2), // Add margin to space out buttons
  '&:hover': {
    background: 'white',
    color: '#000',
    boxShadow: '0 0 10px rgba(173, 216, 230, 0.7)', // Light blue glow
  },
}));

const FeaturesButton = styled(Button)(({ theme }) => ({
  background: 'transparent',
  color: '#000', // Blue text color
  borderRadius: '12px', // Less round
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  transition: 'all 0.3s ease',
  border: '2px solid transparent',
  marginLeft: theme.spacing(2),
  '&:hover': {
    background: 'transparent',
    border: '2px solid #000',
    color: '#000',
    boxShadow: '0 0 10px rgba(0, 123, 255, 0.5)', // Blue glow
  },
}));

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [openSignUpPopup, setOpenSignUpPopup] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 50); // Change 50 to the scroll position where you want the background to change
  };

  const handleLoginClick = () => {
    setOpenLoginPopup(true); // Open the login popup
  };

  const handleSignUpClick = () => {
    setOpenSignUpPopup(true); // Open the signup popup
  };

  const handleCloseLoginPopup = () => {
    setOpenLoginPopup(false); // Close the login popup
  };

  const handleCloseSignUpPopup = () => {
    setOpenSignUpPopup(false); // Close the signup popup
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
          zIndex: 1100 // Ensures the navbar stays on top
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="/jobdope.png"
            alt="Jobdope"
            style={{ height: '60px', marginRight: '20px' }} // Adjust the height and margin as needed
          />
          <FeaturesButton
            color="inherit"
            onClick={handleClick}
            endIcon={<ExpandMoreIcon />} // Dropdown indicator
          >
            Features
          </FeaturesButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>AI Job Match</MenuItem>
            <MenuItem onClick={handleClose}>H1B Sponsors</MenuItem>
            <MenuItem onClick={handleClose}>5-Second Resume</MenuItem>
            <MenuItem onClick={handleClose}>Resume Customization</MenuItem> {/* Renamed field */}
          </Menu>
          <GradientButton>Resume AI</GradientButton>
          <GradientButton>About Us</GradientButton>
          <GradientButton>Blog</GradientButton>
          <div style={{ flexGrow: 1 }} />
          <GradientButton onClick={handleLoginClick}>Login</GradientButton> {/* Open login popup */}
          <SignupButton onClick={handleSignUpClick}>Signup</SignupButton> {/* Open signup popup */}
        </Toolbar>
      </AppBar>
      <LoginPopup open={openLoginPopup} onClose={handleCloseLoginPopup} /> {/* Include LoginPopup */}
      <SignUpPopup open={openSignUpPopup} onClose={handleCloseSignUpPopup} /> {/* Include SignUpPopup */}
    </>
  );
}

export default Navbar;