import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Button, TextField, Typography, CircularProgress, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import LoginPopup from './LoginPopup'; // Import the LoginPopup component
import { blueGrey } from '@mui/material/colors';

// Styled components
const GoogleButton = styled(Button)(({ theme }) => ({
  background: 'black',
  color: '#fff', // Google blue
  borderRadius: '5px',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  border: '0.05px solid #a9a9a9',
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  width: '100%', // Full width
  '&:hover': {
    background: 'white',
    color: '#000',
  },
}));

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
    border: error ? '0.5px solid red' : '0.05px solid #a9a9a9',
  },
  '& .MuiInputLabel-outlined': {
    color: error ? 'red' : '#a9a9a9',
  },
  '& .MuiInputBase-input': {
    padding: '12px',
  },
}));

const SignUpButton = styled(Button)(({ theme, loading }) => ({
  background: 'black',
  color: '#fff',
  borderRadius: '5px',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  border: '2px solid #a9a9a9',
  marginTop: theme.spacing(2),
  width: '100%', // Full width
  transition: 'all 0.3s ease',
  height: '48px', // Fixed height
  position: 'relative',
  '&:hover': {
    background: '#fff',
    color: 'black',
    '& .MuiCircularProgress-root': {
      color: 'white',
    },
  },
  '& .MuiCircularProgress-root': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'blue',
  },
}));

const EyeButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: '50%',
  transform: 'translateY(-50%)',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  color: theme.palette.grey[500],
}));

const SignupPopupContainer = styled('div')({
  display: 'flex',
  width: '100%',
  height: 'auto', // Auto height to fit content
  maxWidth: '900px', // Increased width for more space
  borderRadius: '5px',
  overflow: 'hidden', // Hide any overflow
});

const AnimationContainer = styled('div')({
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: '#f5f5f5', // Optional background color
  padding: '20px', // Added padding for spacing
});

const FormContainer = styled('div')({
  flex: '1',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  borderRadius: '0 5px 5px 0', // Rounded corners for right side
  boxSizing: 'border-box', // Include padding and border in the element's total width and height
});

function SignupPopup({ open, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginPopupOpen, setLoginPopupOpen] = useState(false); // State for login popup

  useEffect(() => {
    if (email) {
      setEmailError(!validateEmail(email));
    }
  }, [email]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    setLoading(true);
    // Simulate a signup request
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 2000);
  };

  const handleOpenLogin = () => {
    setLoginPopupOpen(true);
    onClose(); // Close the signup popup
  };

  const handleCloseLogin = () => {
    setLoginPopupOpen(false);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ borderRadius: '5px', height: 'auto' }}>
        <DialogTitle>
        <Typography variant="h6">
          <center>Create a <span style={{ color: '#000' }}><b>new account</b></span>  to get started</center>
        </Typography>
          <CloseButton onClick={onClose} size="small">
            <CloseIcon />
          </CloseButton>
        </DialogTitle>
        <DialogContent>
          <SignupPopupContainer>
            <AnimationContainer>
              <img src="/animation.gif" alt="Signup Animation" style={{ width: '160%', height: '120%' }} />
            </AnimationContainer>
            <FormContainer>
              <GoogleButton startIcon={<GoogleIcon />}>
                Sign up with Google
              </GoogleButton>
              <Divider sx={{ my: 2 }} />
              <Typography align="center">OR</Typography>
              <br />
              <StyledTextField
                fullWidth
                label="Email Address"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={emailError}
              />
              <StyledTextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <EyeButton onClick={handleTogglePasswordVisibility}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </EyeButton>
                  ),
                }}
              />
              <SignUpButton onClick={handleSignup} loading={loading}>
                {loading ? <CircularProgress size={24} /> : 'Sign Up'}
              </SignUpButton>
              <Divider sx={{ my: 2 }} />
              <Typography align="center" color="textSecondary" variant="body2" sx={{ mt: 2, cursor: 'pointer'}} onClick={handleOpenLogin}>
                Already have an account? Log In
              </Typography>
            </FormContainer>
          </SignupPopupContainer>
        </DialogContent>
      </Dialog>

      {/* Login Popup */}
      <LoginPopup open={loginPopupOpen} onClose={handleCloseLogin} />
    </>
  );
}

export default SignupPopup;