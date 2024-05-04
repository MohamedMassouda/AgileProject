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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsdmp5eG9pbjAwMDBnYWkyYjdpczk4YXQiLCJlbWFpbCI6ImJlbm1hc3NvdWRhbW9oYW1lZEBnbWFpbC5jb20iLCJuYW1lIjoiTW9uYXJjaCIsInJvbGUiOiJPRkZJQ0VfTUVNQkVSIiwiaWF0IjoxNzE0NTY5NDk5LCJleHAiOjE3MTQ1NzMwOTl9.uonU9ZD6IMTj02WuFenpFzhahlTPEDBzbO_KczfDBNA",
        },
      });
      console.log(response.data);
      setEvents(response.data);
    }
    // fetchData();
  }, []);

  return (
    <div className="event-list">
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
      <input
        type="datetime-local"
        onChange={(value) => console.log(value.target.value)}
      />
    </div>
  );
}
