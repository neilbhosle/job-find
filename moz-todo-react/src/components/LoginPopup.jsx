import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Button, TextField, Typography, CircularProgress, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

// Styled components
const GoogleButton = styled(Button)(({ theme }) => ({
  background: 'black',
  color: '#fff', // Google blue
  borderRadius: '5px', // Updated border radius
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
    background: '#f1f3f4',
    color: '#000',
  },
}));

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: '5px', // Updated border radius
    backgroundColor: '#f5f5f5', // Greyish background
    border: error ? '0.5px solid red' : '0.05px solid #fff',
  },
  '& .MuiInputLabel-outlined': {
    color: error ? 'red' : '#a9a9a9',
  },
  '& .MuiInputBase-input': {
    padding: '12px',
  },
}));

const LoginButton = styled(Button)(({ theme, loading }) => ({
  background: 'black',
  color: '#fff',
  borderRadius: '5px', // Updated border radius
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  border: '2px solid #a9a9a9',
  position: 'relative',
  transition: 'all 0.3s ease',
  width: '100%', // Full width
  height: '48px', // Fixed height
  '&:hover': {
    background: 'white',
    color: '#000',
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

const SignUpButton = styled(Button)(({ theme }) => ({
  background: 'black',
  color: '#fff',
  borderRadius: '5px', // Updated border radius
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  border: '2px solid #a9a9a9',
  marginTop: theme.spacing(2),
  width: '100%', // Full width
  transition: 'all 0.3s ease',
  height: '48px', // Fixed height
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

function LoginPopup({ open, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (email) {
      setEmailError(!validateEmail(email));
    }
  }, [email]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    }
    setLoading(true);
    // Simulate a login request
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 2000);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth sx={{ borderRadius: '5px', height: 'auto' }}>
      <DialogTitle>
        <Typography variant="h6">
          <center>Your next <span style={{ color: '#000' }}><b>Job</b></span> awaits you</center>
        </Typography>
        <CloseButton onClick={onClose} size="small">
          <CloseIcon />
        </CloseButton>
      </DialogTitle>
      <DialogContent>
        <GoogleButton startIcon={<GoogleIcon />}>
          Sign in with Google
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
        <LoginButton onClick={handleLogin} loading={loading}>
          {loading ? <CircularProgress size={24} /> : 'Log In'}
        </LoginButton>
        <Divider sx={{ my: 2 }} />
        <Typography align="center" color="textSecondary" variant="body2" sx={{ mt: 2 }}>
          Forgot Password?
        </Typography>
        <Divider sx={{ my: 2 }} />
        <SignUpButton>
          New User? Sign Up now
        </SignUpButton>
      </DialogContent>
    </Dialog>
  );
}

export default LoginPopup;
