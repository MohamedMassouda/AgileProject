import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import { EVENTS_URL } from "../../utils/constants";
import { getCookies } from "../../utils/cookies";
import { fetchData } from "../../utils/functions";
import { toastError } from "../../utils/toast";
import "./EventDescriptionPage.css";

function EventDescription() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [alreadyJoined, setAlreadyJoined] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!event) {
      fetchData(EVENTS_URL + "/" + id).then((data) => {
        setEvent(data.data);
      });
    }

    if (!currentUser) return;

    currentUser.events.forEach((event) => {
      if (event.id === id) {
        setAlreadyJoined(true);
      }
    });
  }, [currentUser]);

  const handleReserve = async (e) => {
    e.preventDefault();

    await fetch(EVENTS_URL + "/" + id + "/add-attendee", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookies()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toastError(data.error);
          return;
        }

        setAlreadyJoined(true);
      });
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  console.log(event);

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
        {!alreadyJoined ? (
          <div className="reserve-spot-container">
            <button className="reserve-button" onClick={handleReserve}>
              Reserve a Spot
            </button>
          </div>
        ) : (
          <div className="reserve-spot-container">
            <button className="reserve-button" disabled>
              Already Joined
            </button>
          </div>
        )}
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
