
import React, { useState } from 'react';
import './App.css';
import './components/Events/EventDescription.css';
import EventDescription from './components/Events/EventDescription';



function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (eventId) => {
    setSelectedEvent(eventId);
  };

  return (
    <div className="app">
      {selectedEvent ? (
        <EventDescription 
          event={events.find(event => event.id === selectedEvent)}
          onBack={() => setSelectedEvent(null)}
        />
      ) : (
        <div className="event-list">
          {events.map(event => (
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