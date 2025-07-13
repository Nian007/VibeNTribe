import React from 'react';

export const LinkedInAuth = () => {
  const handleLinkedInLogin = () => {
    window.location.href = '/api/auth/linkedin';
  };

  return (
    <div className="auth-container">
      <h2>Join VibeNTribe</h2>
      <button className="linkedin-button" onClick={handleLinkedInLogin}>
        <span className="button-text">Continue with LinkedIn</span>
      </button>
    </div>
  );
};
