import React, { useState } from 'react';
import './App.css';
import EventDescription from './components/Events/EventDescription';
import { Eventss } from './components/Events/Eventss'; 

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (eventId) => {
    setSelectedEvent(eventId);
  };

  return (
    <div className="app">
      {selectedEvent ? (
        <EventDescription 
          event={Eventss.find(event => event.id === selectedEvent)} 
          onBack={() => setSelectedEvent(null)}
        />
      ) : (
        <div className="event-list">
          {Eventss.map(event => (
            <div key={event.id} className="event" onClick={() => handleEventClick(event.id)}>
              <img src={event.imageUrl} alt={event.title} />
              <h2>{event.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
