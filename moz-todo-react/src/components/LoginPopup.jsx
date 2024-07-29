import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Button, TextField, Typography, CircularProgress, Divider, FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';

// Styled components
const GoogleButton = styled(Button)(({ theme }) => ({
  background: '#212e7c',
  color: '#fff',
  borderRadius: '5px',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  border: '0.05px solid #a9a9a9',
  marginBottom: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  '&:hover': {
    background: '#000',
    color: '#fff',
  },
}));

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: '5px',
    backgroundColor: '#eaedff',
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
  background: '#212e7c',
  color: '#fff',
  borderRadius: '5px',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  border: '2px solid #a9a9a9',
  position: 'relative',
  transition: 'all 0.3s ease',
  width: '100%',
  height: '48px',
  '&:hover': {
    background: '#000',
    color: '#fff',
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
  background: '#212e7c',
  color: '#fff',
  borderRadius: '5px',
  padding: '10px 20px',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 'bold',
  border: '2px solid #a9a9a9',
  marginTop: theme.spacing(2),
  width: '100%',
  transition: 'all 0.3s ease',
  height: '48px',
  '&:hover': {
    background: '#000',
    color: 'white',
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

const RememberMeCheckbox = styled(Checkbox)(({ theme }) => ({
  '&.Mui-checked': {
    color: '#7788EE',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 28,
  },
}));

function LoginPopup({ open, onClose, onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
      onLoginSuccess(); // Notify the Navbar of successful login
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
        <Typography variant="h6" component="div" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>Your <b>next</b> job awaits you at</span>
          <img
            src="/jobdope-2.png"
            alt="Jobdope"
            style={{ height: '40px', marginLeft: '10px' }}
          />
        </Typography>
        <CloseButton onClick={onClose} size="small">
          <CloseIcon />
        </CloseButton>
      </DialogTitle>
      <DialogContent>
        <GoogleButton startIcon={<img src="/g.png" alt="Google" style={{ height: '24px', width: '24px', marginRight: '8px' }} />}>
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
        <center>
          <FormControlLabel
            control={
              <RememberMeCheckbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember Me"
            sx={{ marginBottom: 2 }}
          />
        </center>
        <LoginButton onClick={handleLogin} loading={loading}>
          {loading ? <CircularProgress size={24} /> : 'Log In'}
        </LoginButton>
        <Typography align="center" color="textSecondary" variant="body2" sx={{ mt: 2 }}>
          Forgot Password?
        </Typography>
        <SignUpButton>
          New User? Sign Up
        </SignUpButton>
      </DialogContent>
    </Dialog>
  );
}

export default LoginPopup;