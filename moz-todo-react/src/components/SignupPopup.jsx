
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, IconButton, Button, TextField, Typography,
  CircularProgress, Divider, Checkbox, FormControlLabel, Stepper, Step, StepLabel, Chip, Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import LoginPopup from './LoginPopup'; // Import the LoginPopup component

// Styled components
const GoogleButton = styled(Button)(({ theme }) => ({
  background: 'black',
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
    background: '#7788EE',
    color: '#fff',
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
  width: '100%',
  transition: 'all 0.3s ease',
  height: '48px',
  position: 'relative',
  '&:hover': {
    background: '#7788EE',
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
  width: '100%',
  height: 'auto',
  maxWidth: '900px',
  borderRadius: '5px',
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
  borderRadius: '0 5px 5px 0',
  boxSizing: 'border-box',
});

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: '#7788EE',
  '&.Mui-checked': {
    color: '#7788EE',
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
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{ borderRadius: '5px', height: 'auto' }}>
        <DialogTitle>
          <Typography variant="h6">
            <center>Create a <span style={{ color: '#000' }}><b>new account</b></span> to get started</center>
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
                  color: activeStep === index ? '#7788EE' : '#C0C0C0',
                },
              }}
              sx={{
                '& .MuiStepLabel-label': {
                  color: activeStep === index ? '#7788EE' : '#C0C0C0',
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
                <img src="/animation.gif" alt="Signup Animation" style={{ width: '300%', height: '110%' }} />
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
                <FormControlLabel
                  control={<StyledCheckbox checked={receiveUpdates} onChange={() => setReceiveUpdates(!receiveUpdates)} />}
                  label="I want to receive updates from Jobdope about latest job offers"
                />
                <SignUpButton onClick={handleSignup} loading={loading}>
                  {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                </SignUpButton>
                <Divider sx={{ my: 2 }} />
                <Typography align="center" variant="body2" sx={{ mt: 2, cursor: 'pointer' }}>
                  By continuing, you agree to the <b>JobDope Terms of Service</b> and the <b>Privacy Policy</b>.
                </Typography>
                <Typography align="center" color="textSecondary" variant="body2" sx={{ mt: 2, cursor: 'pointer' }} onClick={handleOpenLogin}>
                  Already have an account? Log In
                </Typography>
              </FormContainer>
            </SignupPopupContainer>
          )}
          {activeStep === 1 && (
            <div>
              <Typography variant="h6" align="center">Job Search Preferences</Typography>
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant={jobType === 'rush' ? 'contained' : 'outlined'}
                  startIcon={<DirectionsRunIcon />}
                  onClick={() => setJobType('rush')}
                  sx={{
                    marginRight: 2,
                    borderRadius: '0', // Square shape
                    borderColor: '#7788EE',
                    color: jobType === 'rush' ? '#fff' : '#7788EE',
                    backgroundColor: jobType === 'rush' ? '#7788EE' : 'transparent',
                    '&:hover': {
                      backgroundColor: jobType === 'rush' ? '#6678CC' : '#7788EE',
                      color: '#fff',
                    },
                  }}
                >
                  I'm looking for jobs in a rush
                </Button>
                <Button
                  variant={jobType === 'no-rush' ? 'contained' : 'outlined'}
                  startIcon={<LocalCafeIcon />}
                  onClick={() => setJobType('no-rush')}
                  sx={{
                    borderRadius: '0', // Square shape
                    borderColor: '#7788EE',
                    color: jobType === 'no-rush' ? '#fff' : '#7788EE',
                    backgroundColor: jobType === 'no-rush' ? '#7788EE' : 'transparent',
                    '&:hover': {
                      backgroundColor: jobType === 'no-rush' ? '#6678CC' : '#7788EE',
                      color: '#fff',
                    },
                  }}
                >
                  I'm open to new opportunities, no rush
                </Button>
              </Box>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button
                  variant="contained"
                  onClick={handleBack}
                  sx={{
                    borderRadius: '0',
                    borderColor: '#7788EE',
                    backgroundColor: '#7788EE',
                    '&:hover': {
                      backgroundColor: '#6678CC',
                      color: '#fff',
                    },
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isNextDisabled()}
                  sx={{
                    borderRadius: '0',
                    borderColor: '#7788EE',
                    backgroundColor: '#7788EE',
                    '&:hover': {
                      backgroundColor: '#6678CC',
                      color: '#fff',
                    },
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div>
              <Typography variant="h6" align="center">Job Details</Typography>
              <Box display="flex" alignItems="center" mt={2}>
                <StyledTextField
                  label="Job Title"
                  variant="outlined"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  sx={{ width: '40%', marginRight: 1 }}
                />
                <IconButton
                  color="primary"
                  onClick={handleAddJobTitle}
                  sx={{
                    color: '#7788EE',
                    '&:hover': {
                      color: '#6678CC',
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Box mt={2} display="flex" flexWrap="wrap">
                {jobTitles.map((title) => (
                  <Chip
                    key={title}
                    label={title}
                    onDelete={handleDeleteJobTitle(title)}
                    deleteIcon={<DeleteIcon />}
                    sx={{
                      marginRight: 1,
                      marginBottom: 1,
                      backgroundColor: '#7788EE',
                      color: '#fff',
                      '& .MuiChip-deleteIcon': {
                        color: '#fff',
                      },
                    }}
                  />
                ))}
              </Box>
              <Box display="flex" alignItems="center" mt={2}>
                <StyledTextField
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  sx={{ width: '40%', marginRight: 2 }}
                />
                <FormControlLabel
                  control={<StyledCheckbox checked={openToRemote} onChange={() => setOpenToRemote(!openToRemote)} />}
                  label="Open to Remote"
                />
              </Box>
              <Typography variant="body1" mt={2}>
                Job Type
              </Typography>
              <Box display="flex" alignItems="center" mt={1}>
                <FormControlLabel
                  control={<StyledCheckbox checked={jobType === 'full-time'} onChange={() => setJobType('full-time')} />}
                  label="Full-time"
                />
                <FormControlLabel
                  control={<StyledCheckbox checked={jobType === 'contract'} onChange={() => setJobType('contract')} />}
                  label="Contract"
                />
                <FormControlLabel
                  control={<StyledCheckbox checked={jobType === 'part-time'} onChange={() => setJobType('part-time')} />}
                  label="Part-time"
                />
                <FormControlLabel
                  control={<StyledCheckbox checked={jobType === 'internship'} onChange={() => setJobType('internship')} />}
                  label="Internship"
                />
              </Box>
              <FormControlLabel
                control={<StyledCheckbox checked={h1bSponsorship} onChange={() => setH1bSponsorship(!h1bSponsorship)} />}
                label="H1B Sponsorship"
                sx={{ mt: 2 }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                <Button
                  variant="contained"
                  onClick={handleBack}
                  sx={{
                    borderRadius: '5px', // Square shape
                    borderColor: '#7788EE',
                    backgroundColor: '#7788EE',
                    '&:hover': {
                      backgroundColor: '#6678CC',
                      color: '#fff',
                    },
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={onClose}
                  sx={{
                    borderRadius: '5px', // Square shape
                    borderColor: '#7788EE',
                    backgroundColor: '#7788EE',
                    '&:hover': {
                      backgroundColor: '#6678CC',
                      color: '#fff',
                    },
                  }}
                >
                  Finish
                </Button>
              </div>
            </div>
          )}

        </DialogContent>
      </Dialog>

      <LoginPopup open={loginPopupOpen} onClose={handleCloseLogin} />
    </>
  );
}

export default SignupPopup;
