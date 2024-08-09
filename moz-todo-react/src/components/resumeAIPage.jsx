import React, { useState } from 'react';
import { Box, Typography, TextField, Paper, Button, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const BannerSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '90vh',
  padding: '0 5%',
  color: '#000',
  position: 'relative',
  zIndex: 1,
}));

const ParallaxBackground = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(white, #7788EE)',
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
}));

const Section = styled(Paper)(({ theme }) => ({
  width: '45%',
  height: '70vh',
  padding: theme.spacing(3),
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

const SectionTitle = styled(motion.div)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    height: '100%',
    '& textarea': {
      height: '100% !important',
    },
  },
}));

const GenerateButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#000',
    color: 'white',
    border: '2px solid black',
    borderRadius: '20px',
    padding: '10px 20px',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: '#000',
      boxShadow: '0 0 10px 5px rgba(119, 136, 238, 0.5)',
      '& .MuiButton-label': {
        textShadow: '0 0 5px #7788EE',
      },
    },
  }));

const OrDivider = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
}));

const UploadArea = styled(Box)(({ theme }) => ({
  border: '2px dashed #7788EE',
  borderRadius: '10px',
  padding: theme.spacing(1),
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  cursor: 'pointer',
}));

const ResumeAIPage = () => {
    const [jobDescription, setJobDescription] = useState('');
    const [resumeText, setResumeText] = useState('');
    const [fileName, setFileName] = useState('');
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setFileName(file.name);
        // We're not parsing the file content into the text area anymore
      }
    };
  
    return (
      <>
        <ParallaxBackground />
        <BannerSection>
          <Section elevation={3}>
            <SectionTitle
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h5" gutterBottom>
                Paste your job description here
              </Typography>
            </SectionTitle>
            <StyledTextField
              multiline
              variant="outlined"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </Section>
          <Section elevation={3}>
            <SectionTitle
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h5" gutterBottom>
                Upload or paste your resume
              </Typography>
            </SectionTitle>
            <UploadArea
              component="label"
              htmlFor="resume-file-upload"
            >
              <input
                id="resume-file-upload"
                type="file"
                accept=".txt,.pdf,.doc,.docx"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
              <CloudUploadIcon fontSize="large" color="primary" />
              <Typography>Drag & Drop or Click to Upload Resume</Typography>
              {fileName && (
                <Typography variant="body2" style={{ marginTop: '8px' }}>
                  File selected: {fileName}
                </Typography>
              )}
            </UploadArea>
            <OrDivider>
              <Divider style={{ flex: 1 }} />
              <Typography variant="body1" style={{ margin: '0 16px' }}>
                OR
              </Typography>
              <Divider style={{ flex: 1 }} />
            </OrDivider>
            <StyledTextField
              multiline
              variant="outlined"
              placeholder="Paste your resume text here"
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            />
          </Section>
        </BannerSection>
        <Box display="flex" justifyContent="center" mt={1}>
          <GenerateButton
            variant="outlined"
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Generate
          </GenerateButton>
        </Box>
      </>
    );
  };
  
  export default ResumeAIPage;