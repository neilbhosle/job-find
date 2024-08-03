import './App.css'
import { useState } from 'react'
import Navbar from './components/Navbar'
import { Typography, Button, CssBaseline } from '@mui/material';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CssBaseline />
      <Navbar />
    </>
  )
}

export default App