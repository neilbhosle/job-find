// import { CssBaseline } from '@mui/material';
// import Navbar from './components/Navbar';
// import LandingPage from './components/LandingPage';

// function App() {
//   return (
//     <>
//       <CssBaseline />
//       <Navbar />
//       <LandingPage />
//     </>
//   );
// }

// export default App;

// import React from 'react';
// import Navbar from './components/Navbar';
// import { Box, Typography, Button } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import './App.css'; // Assuming you're using some global styles here

// // Styled components
// const BannerSection = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   height: '100vh',
//   padding: '0 5%',
//   backgroundImage: 'url("/your-image-path.jpg")',
//   backgroundAttachment: 'fixed', // This creates the parallax effect
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
//   backgroundRepeat: 'no-repeat',
//   color: '#fff',
//   position: 'relative',
//   zIndex: 1,
// }));

// const Tagline = styled(Box)(({ theme }) => ({
//   maxWidth: '600px',
//   paddingRight: theme.spacing(4),
// }));

// const TaglineText = styled(Typography)(({ theme }) => ({
//   fontSize: '3rem',
//   fontWeight: 'bold',
//   lineHeight: 1.2,
// }));

// const SignupButton = styled(Button)(({ theme }) => ({
//   background: '#000',
//   color: 'white',
//   borderRadius: '12px',
//   padding: '10px 20px',
//   textTransform: 'none',
//   fontSize: '16px',
//   fontWeight: 'bold',
//   transition: 'all 0.3s ease',
//   cursor: 'pointer',
//   marginTop: theme.spacing(2),
//   '&:hover': {
//     background: '#7788EE',
//     color: '#fff',
//     textShadow: '0 0 6px #7788EE',
//   },
// }));

// const ParallaxBackground = styled(Box)(({ theme }) => ({
//   backgroundImage: 'linear-gradient(white, #7788EE)',
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100%',
//   height: '100%',
//   zIndex: -1,
// }));

// function App() {
//   return (
//     <>
//       <ParallaxBackground />
//       <Navbar />
//       <BannerSection>
//         <Tagline>
//           <TaglineText>
//             Accelerate Your Job Hunt with AI-Powered Support
//           </TaglineText>
//           <SignupButton variant="contained">
//             Get Started
//           </SignupButton>
//         </Tagline>
//         <Box>
//           <img src="/output-onlinegiftools.gif" alt="AI Support" style={{ width: '100%', maxWidth: '500px' }} />
//         </Box>
//       </BannerSection>
//     </>
//   );
// }

// export default App;

// import React from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import './App.css'; 

function App() {
  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
}

export default App;
