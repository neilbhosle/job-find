import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, IconButton, Button, TextField, Typography,
  CircularProgress, Divider, Checkbox, FormControlLabel, Stepper, Step, StepLabel, Chip, Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import LoginPopup from './LoginPopup'; // Import the LoginPopup component

// Styled components
const FixedDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '600px',
    height: '650px',
    borderRadius: '10px',
    overflow: 'hidden',
  },
}));

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
  position: 'relative',
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

const SignupPopupContainer = styled('div')({
  display: 'flex',
  height: '100%',
  borderRadius: '8px',
  overflow: 'hidden',
});

const AnimationContainer = styled('div')({
  flex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  backgroundColor: '#f5f5f5',
  padding: '20px',
});

const FormContainer = styled('div')({
  flex: '1',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  borderRadius: '0 8px 8px 0',
  boxSizing: 'border-box',
});

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: '#7788EE',
  '&.Mui-checked': {
    color: '#212e7c',
  },
}));

const steps = ['Account Creation', 'Job Search Preferences', 'Job Details'];

function SignupPopup({ open, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);
  const [receiveUpdates, setReceiveUpdates] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [jobType, setJobType] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [openToRemote, setOpenToRemote] = useState(false);
  const [h1bSponsorship, setH1bSponsorship] = useState(false);
  const [jobTitles, setJobTitles] = useState([]);

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
    setTimeout(() => {
      setLoading(false);
      setActiveStep(1);
    }, 2000);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleOpenLogin = () => {
    setLoginPopupOpen(true);
    onClose();
  };

  const handleCloseLogin = () => {
    setLoginPopupOpen(false);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleAddJobTitle = () => {
    if (jobTitle && !jobTitles.includes(jobTitle)) {
      setJobTitles([...jobTitles, jobTitle]);
      setJobTitle('');
    }
  };

  const handleDeleteJobTitle = (titleToDelete) => () => {
    setJobTitles((titles) => titles.filter((title) => title !== titleToDelete));
  };

  const isNextDisabled = () => {
    if (activeStep === 0) {
      return loading;
    }
    if (activeStep === 1) {
      return jobType === '';
    }
    if (activeStep === 2) {
      return jobTitles.length === 0 || location === '';
    }
    return false;
  };

  return (
    <>
      <FixedDialog open={open} onClose={onClose}>
        <DialogTitle>
          <Typography variant="h6" component="div" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>Create a <b>new account</b> to get started with</span>
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
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      color: activeStep === index ? '#000' : '#C0C0C0',
                    },
                  }}
                  sx={{
                    '& .MuiStepLabel-label': {
                      color: activeStep === index ? '#000' : '#C0C0C0',
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <SignupPopupContainer>
              <AnimationContainer>
                <img src="/animation.jpg" alt="Signup Animation" style={{ width: '140%', height: '110%' }} />
              </AnimationContainer>
              <FormContainer>
                <GoogleButton startIcon={<img src="/g.png" alt="Google" style={{ width: '24px', height: '24px' }} />} onClick={handleOpenLogin}>
                  Sign up with Google
                </GoogleButton>

                <StyledTextField
                  label="Email Address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError}
                  helperText={emailError ? 'Invalid email address' : ''}
                />

                <StyledTextField
                  label="Password"
                  variant="outlined"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <EyeButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </EyeButton>
                    ),
                  }}
                />

                <FormControlLabel
                  control={
                    <StyledCheckbox
                      checked={receiveUpdates}
                      onChange={(e) => setReceiveUpdates(e.target.checked)}
                    />
                  }
                  label="Receive updates and offers"
                />

                <SignUpButton onClick={handleSignup} loading={loading} disabled={isNextDisabled()}>
                  {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                </SignUpButton>

                <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
                  Already have an account? <Button onClick={handleOpenLogin}>Log in</Button>
                </Typography>
              </FormContainer>
            </SignupPopupContainer>
          )}

          {activeStep === 1 && (
            <Box>
              <Typography variant="h6" style={{ marginBottom: '16px' }}>Job Search Preferences</Typography>
              <StyledTextField
                label="Preferred Job Type"
                variant="outlined"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              />
              <StyledTextField
                label="Preferred Job Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <FormControlLabel
                control={
                  <StyledCheckbox
                    checked={openToRemote}
                    onChange={(e) => setOpenToRemote(e.target.checked)}
                  />
                }
                label="Open to remote positions"
              />
              <FormControlLabel
                control={
                  <StyledCheckbox
                    checked={h1bSponsorship}
                    onChange={(e) => setH1bSponsorship(e.target.checked)}
                  />
                }
                label="Need H-1B sponsorship"
              />
              <Button variant="contained" color="primary" onClick={handleNext} disabled={isNextDisabled()} style={{ marginTop: '16px' }}>
                Next
              </Button>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              <Typography variant="h6" style={{ marginBottom: '16px' }}>Job Details</Typography>
              <StyledTextField
                label="Job Title"
                variant="outlined"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleAddJobTitle}>
                      <AddIcon />
                    </IconButton>
                  ),
                }}
              />
              <Box>
                {jobTitles.map((title) => (
                  <Chip
                    key={title}
                    label={title}
                    onDelete={handleDeleteJobTitle(title)}
                    style={{ margin: '4px' }}
                  />
                ))}
              </Box>
              <StyledTextField
                label="Job Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleNext} disabled={isNextDisabled()} style={{ marginTop: '16px' }}>
                Finish
              </Button>
              <Button variant="outlined" onClick={handleBack} style={{ marginLeft: '16px', marginTop: '16px' }}>
                Back
              </Button>
            </Box>
          )}
        </DialogContent>
      </FixedDialog>

      <LoginPopup open={loginPopupOpen} onClose={handleCloseLogin} />
    </>
  );
}

export default SignupPopup;