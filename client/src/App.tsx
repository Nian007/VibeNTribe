import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to VibeNTribe!</h1>
      <p>This is the homepage.</p>
      <Link to="/about">About</Link>
    </div>
  );
}

function AboutPage() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Learn more about VibeNTribe.</p>
      <Link to="/">Home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
