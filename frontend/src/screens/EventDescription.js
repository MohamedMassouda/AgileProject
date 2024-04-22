// EventDescription.js
import React, { useState } from 'react';
import './EventDescription.css';

function EventDescription({ event, onBack }) {
  const [showMap, setShowMap] = useState(false);
  const [ticketCount, setTicketCount] = useState(0);

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  const handleAddTicket = () => {
    setTicketCount(prevCount => prevCount + 1);
  };

  const handleRemoveTicket = () => {
    if (ticketCount > 0) {
      setTicketCount(prevCount => prevCount - 1);
    }
  };

  return (
    <div className="event-description">
      <div className="event-header">
        <img src={event.imageUrl} alt={event.title} className="event-image" />
      </div>
      <div className="event-body">
        <div className="event-details">
          <div className="details-item">
            <span>Date & Time:</span>
            <p>{event.dateTime}</p>
          </div>
          <div className="details-item">
            <span>Location:</span>
            <p>{event.location}</p>
          </div>
          <div className="details-item">
            <span>Tunisia</span>
          </div>
          <div className="details-item">
            <button onClick={toggleMap} className="map-toggle">{showMap ? 'Hide Map' : 'Show Map'}</button>
          </div>
          {showMap && (
            <div className="map">
              {/* Include Google Maps iframe */}
              <iframe title="Event Location Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51999.43725244058!2d10.23749765!3d36.8425613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12ff300f0b5ff7b3%3A0x66f5decc447e9172!2sTunis%2C%20Tunisia!5e0!3m2!1sen!2s!4v1649806842961!5m2!1sen!2s" width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe>
            </div>
          )}
        </div>
        <div className="general-admission">
          <h2>General Admission</h2>
          <div className="ticket-controls">
            <button className="ticket-button" onClick={handleRemoveTicket}>-</button>
            <span className="ticket-count">{ticketCount === 0 ? ' ' : ticketCount}</span>
            <button className="ticket-button" onClick={handleAddTicket}>+</button>
          </div>
        </div>
        <div className="ballet-section">
          <h2>Ballet / Dance</h2>
          <p>Ballet is an astounding combination of athletic prowess and aesthetic grace. The choreography is utterly precise, calling on a tradition that goes back to the 17th century, and yet the movements come together in a dance form that exudes energy and emotion. Originally, this academic dance technique was strictly bound to opera, where it was an integral part of the performance. In the late 18th century, ballet emerged as an art form in its own right. Many European ballet companies today are still associated with the famous opera houses in which they perform, and they frequently share an orchestra with the opera company.</p>
        </div>
        <div className="event-details">
          <div className="details-item">
            <span>About this event:</span>
            <p>{event.about}</p>
          </div>
        </div>
        <button className="back-button" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}

export default EventDescription;


