import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; // Adjust the import path as necessary
import HomePage from './pages/home';
import UploadPage from './pages/upload';
import TranscriptPage from './pages/transcript';
import SummaryPage from './pages/summary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Login Page at root */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage/>}/>
        <Route path="/transcript" element={<TranscriptPage/>}/>
        <Route path="/summary" element={<SummaryPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;