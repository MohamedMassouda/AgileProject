import React from "react";
import Event from "./Event";
import "./Events.css";
export default function Events() {
  const events = [
    {
      id: 1,
      title: "The Great Gatsby",
      date: "April 10, 1925",
      location: "somewhere",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5lln6jE_V4ZzHmjvBPLceaIan_95pAMrQx6GeoY8-HA&s",
      
    },

    {
      id: 2,
      title: "smart contract with us",
      date: "May 07, 2024",
      location: "Tunis",
      imageUrl:
        "https://cdn-az.allevents.in/events5/banners/9bc5b1b6926cd7200ccc7efdb332b39d45b15d6c303dec570a7f558cf08bac98-rimg-w940-h470-gmir.jpg?v=1711668222",
    },
    {
      id: 3,
      title: "IE Experience Day Tunisia",
      date: "April 22, 2024",
      location: "Tunis",
      imageUrl:
        "https://cdn-az.allevents.in/events5/banners/35124f277c34a0ccd57af2968a6ae1103ce678eb71793a865f0068a482d1d108-rimg-w1200-h600-gmir.jpg?v=1709995211",
        
    },
    {
      id: 4,
      title: "Holi Festival",
      date: " March 25, 2024",
      location: "India",
      imageUrl:
        "https://chicagoparent.nyc3.cdn.digitaloceanspaces.com/wp-content/uploads/2022/03/calendar-holi-photo-credit-istock-BartoszHadyniak-746x500.jpg",
    },
    {
      id: 5,
      title: "Lantern Festival",
      date: "Feb 12, 2025",
      location: "China",
      imageUrl:
        "https://afar.brightspotcdn.com/dims4/default/f584376/2147483647/strip/false/crop/2000x1333+0+0/resize/1486x990!/quality/90/?url=https%3A%2F%2Fafar-media-production-web.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fc0%2Fd7%2F999a7a0d498197b219b00115cecb%2Foriginal-lantern-festival-floating.jpg",
    },
    {
      id: 6,
      title: "Mardis Gras",
      date: "Mar 4, 2025",
      location: "City of New Orleans",
      imageUrl:
        "https://monacorona.com/wp-content/uploads/2023/03/mardi-gras-parades.jpg",
    },
    // Add more events as needed
  ];
  return (
    <div className="event-list">
      {events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </div>
  );
}
