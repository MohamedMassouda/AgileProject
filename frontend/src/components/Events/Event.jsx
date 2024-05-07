import React from "react";
import { Link } from "react-router-dom";

function Event({ event }) {
  return (
    <Link to={`/events/${event.id}`}>
      <div className="event">
        <img src={event.imageUrl} alt={event.title} />
        <h2>{event.title}</h2>
        <p>{event.date}</p>
        <p>{event.location}</p>
      </div>
    </Link>
  );
}

export default Event;
