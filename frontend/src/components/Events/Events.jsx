import axios from "axios";
import React, { useEffect, useState } from "react";
import EventDescription from "../../screens/EventDescriptionPage/EventDescriptionPage";
import "./Events.css";

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
    async function fetchData() {
      const response = await axios.get("http://localhost:3000/events", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdnJ4eW1tNDAwMDA4eTJ4eHR2aGJuY3oiLCJlbWFpbCI6IndpYmFkYXIzMzFAc2hhbnJldG8uY29tIiwibmFtZSI6IndpYmFkYXIzMzEiLCJyb2xlIjoiTUVNQkVSIiwiaWF0IjoxNzE0ODU1OTkzLCJleHAiOjE3MTQ4NTk1OTN9.D-HfeLJAWoiiyVn4D3xuAWocde7YMimRZJo49HcF0_U",
        },
      });
      console.log(response.data);
      setEvents(response.data);
    }
    fetchData();
  }, []);

  return (
    <div className="event-list">
      {events.length !== 0 ? (
        <EventDescription event={events[0]} onBack={() => {}} />
      ) : null}
    </div>
  );
}
