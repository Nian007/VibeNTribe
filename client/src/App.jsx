import React from 'react';
import { LinkedInAuth } from './components/LinkedInAuth';
import { Navbar } from './components/Navbar';
import { FeatureCard } from './components/FeatureCard';
import { TravelCard } from './components/TravelCard';

function App() {
  const features = [
    {
      icon: "🌍",
      title: "Smart Matching",
      description: "Find travelers with overlapping dates and compatible preferences"
    },
    {
      icon: "💬",
      title: "Group Chat",
      description: "Coordinate plans in real-time with integrated messaging"
    },
    {
      icon: "✈️",
      title: "Travel Together",
      description: "Create unforgettable journeys with like-minded adventurers"
    }
  ];

  const recentTrips = [
    {
      destination: "Bali, Indonesia",
      dates: "March 15-22, 2025",
      travelers: [
        { name: "Alex", avatar: "https://i.pravatar.cc/100?img=1" },
        { name: "Jamie", avatar: "https://i.pravatar.cc/100?img=2" }
      ]
    },
    {
      destination: "Santorini, Greece",
      dates: "April 1-8, 2025",
      travelers: [
        { name: "Sam", avatar: "https://i.pravatar.cc/100?img=3" },
        { name: "Taylor", avatar: "https://i.pravatar.cc/100?img=4" }
      ]
    }
  ];

  return (
    <div className="app">
      <Navbar />
      
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Travel Tribe</h1>
          <p className="hero-subtitle">Connect with adventurers who share your dates and vibe</p>
          <LinkedInAuth />
        </div>
      </header>

      <section id="features" className="features-section">
        <h2 className="section-title">Why VibeNTribe?</h2>
        <div className="features-grid">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3 className="step-title">Connect Your Profile</h3>
            <p className="step-description">Sync your LinkedIn profile and travel preferences</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3 className="step-title">Set Your Dates</h3>
            <p className="step-description">Select your available travel windows and destinations</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3 className="step-title">Match & Explore</h3>
            <p className="step-description">Get matched with compatible travelers and start planning</p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <h2 className="section-title">Traveler Stories</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">"Found my perfect travel partner for Japan! The matching algorithm is spot on."</p>
            <div className="testimonial-author">
              <img src="https://i.pravatar.cc/100?img=5" alt="User" className="testimonial-avatar" />
              <span className="testimonial-name">Morgan Lee</span>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"Connected with 3 amazing people for our Iceland trip. The group chat made planning effortless."</p>
            <div className="testimonial-author">
              <img src="https://i.pravatar.cc/100?img=6" alt="User" className="testimonial-avatar" />
              <span className="testimonial-name">Jordan Smith</span>
            </div>
          </div>
        </div>
      </section>

      <section className="recent-trips">
        <h2 className="section-title">Recent Matches</h2>
        <div className="trips-grid">
          {recentTrips.map((trip, i) => (
            <TravelCard key={i} {...trip} />
          ))}
        </div>
      </section>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-text">© 2025 VibeNTribe. Travel smarter, explore deeper.</p>
          <div className="footer-links">
            <a href="#" className="footer-link">Privacy</a>
            <a href="#" className="footer-link">Terms</a>
            <a href="#" className="footer-link">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
