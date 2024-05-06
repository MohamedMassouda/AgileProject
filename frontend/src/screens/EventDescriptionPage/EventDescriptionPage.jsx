import React, { useEffect, useState } from "react";
import "./EventDescriptionPage.css";
import { fetchData } from "../../utils/functions";
import { EVENTS_URL } from "../../utils/constants";
import { useParams } from "react-router-dom";

function EventDescription() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchData(EVENTS_URL + "/" + id).then((data) => {
      setEvent(data.data);
    });
  }, [event, id]);

  const handleReserve = (e) => {
    e.preventDefault();

    
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="event-description">
      <div className="event-header">
        <img src={event.imageUrl} alt={event.title} className="event-image" />
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
          </div>
        </div>
        <div className="reserve-spot-container">
          <button className="reserve-button">Reserve a Spot</button>
        </div>
        <div className="event-details">
          <div className="details-item">
            <span>about this event: </span>
            <p>{event.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDescription;
