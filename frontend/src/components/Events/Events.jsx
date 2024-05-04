import axios from "axios";
import React, { useEffect, useState } from "react";
import Event from "./Event";
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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdnJ4eW1tNDAwMDA4eTJ4eHR2aGJuY3oiLCJlbWFpbCI6IndpYmFkYXIzMzFAc2hhbnJldG8uY29tIiwibmFtZSI6IndpYmFkYXIzMzEiLCJyb2xlIjoiTUVNQkVSIiwiaWF0IjoxNzE0ODI1NDIyLCJleHAiOjE3MTQ4MjkwMjJ9.MIVj9_pUEFjSkCaYa_cqInrpYCaFj4SR0LydSntO1KU",
        },
      });
      console.log(response.data);
      setEvents(response.data);
    }
    fetchData();
  }, []);

  return (
    <div className="event-list">
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
}
