import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import ResumeAIPage from './components/resumeAIPage'; // Assuming you have this component
import './App.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resume-ai" element={<ResumeAIPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;