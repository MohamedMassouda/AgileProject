import React, { useState } from "react";
import "./EventDescriptionPage.css";

function EventDescription({
  event,
  onBack,
  customSectionTitle,
  customSectionDescription,
}) {
  const [ticketCount, setTicketCount] = useState(0);
  const [showSecondaryImage, setShowSecondaryImage] = useState(false);

  const handleAddTicket = () => {
    setTicketCount((prevCount) => prevCount + 1);
  };

  const handleRemoveTicket = () => {
    if (ticketCount > 0) {
      setTicketCount((prevCount) => prevCount - 1);
    }
  };

  const handleBalletClick = () => {
    setShowSecondaryImage(true);
  };

  return (
    <div className="event-description">
      <div className="event-header">
        <img src={event.imageUrl} alt={event.title} className="event-image" />
        {showSecondaryImage && (
          <img
            src="https://img.freepik.com/free-vector/white-abstract-wallpaper_23-2148830027.jpg?w=996&t=st=1713817489~exp=1713818089~hmac=65b7badec723888d6685717ffe4fc15b83a0bc36d30a1d44427acdb065d70b99"
            alt="Ballet"
            className="secondary-image"
          />
        )}
      </div>
      <div className="event-body">
        <div className="event-details">
          <div className="details-item">
            <span>Date & Time:</span>
            <p>{event.date}</p>
          </div>
          <div className="details-item">
            <span>Location:</span>
            <p>{event.location}</p>
          </div>
        </div>
        <div className="general-admission-container">
          <div className="general-admission">
            <h2>General Admission</h2>
            <div className="ticket-controls">
              <button className="ticket-button" onClick={handleRemoveTicket}>
                -
              </button>
              <span className="ticket-count">
                {ticketCount === 0 ? " " : ticketCount}
              </span>
              <button className="ticket-button" onClick={handleAddTicket}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className="reserve-spot-container">
          <button className="reserve-button">Reserve a Spot</button>
        </div>
        <div className="ballet-section" onClick={handleBalletClick}>
          <h2>{customSectionTitle}</h2>
          <p>{customSectionDescription}</p>
        </div>
        <div className="event-details">
          <div className="details-item">
            <span>about this event: </span>
            <p>{event.description}</p>
          </div>
        </div>
        <button className="back-button" onClick={onBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default EventDescription;
