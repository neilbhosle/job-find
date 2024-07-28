import React from 'react';
import './App.css';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';

function App() {
  return (
    <div className="App">
      <div className="container">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  );
}

export default App;
