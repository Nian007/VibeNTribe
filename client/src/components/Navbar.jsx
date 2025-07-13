import React from 'react';

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="logo">VibeNTribe</span>
      </div>
      <div className="navbar-links">
        <a href="#features" className="nav-link">Features</a>
        <a href="#how-it-works" className="nav-link">How It Works</a>
        <a href="#testimonials" className="nav-link">Stories</a>
      </div>
    </nav>
  );
};
