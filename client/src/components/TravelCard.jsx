import React from 'react';

export const TravelCard = ({ destination, dates, travelers }) => {
  return (
    <div className="travel-card">
      <div className="travel-image" style={{ backgroundImage: `url(https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)` }}></div>
      <div className="travel-info">
        <h3 className="travel-destination">{destination}</h3>
        <p className="travel-dates">📅 {dates}</p>
        <div className="travelers">
          {travelers.map((traveler, i) => (
            <img key={i} src={traveler.avatar} alt={traveler.name} className="traveler-avatar" />
          ))}
        </div>
      </div>
    </div>
  );
};
