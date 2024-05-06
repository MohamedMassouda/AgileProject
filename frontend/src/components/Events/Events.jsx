import axios from "axios";
import React, { useEffect, useState } from "react";
import Event from "./Event";
import "./Events.css";
import { EVENTS_URL } from "../../utils/constants";
import { fetchData } from "../../utils/functions";

/*

  Event Object
  {
    id: string,
    title: string,
    description: string,
    date: string,
    location: string,
    host: User,
    attendees: User[]
    categories: Category[],
    createdAt: string,
    updatedAt: string,
  }
  
  Category Object
  {
    id: string,
      name: string,
      events: Event[]
  }
  */

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData(EVENTS_URL).then((data) => {
      setEvents(data.data);
    });
  }, []);

  return (
    <div className="event-list">
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
}
