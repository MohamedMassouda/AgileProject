
import React, { useState } from 'react';
import './App.css';
import './screens/EventDescription.css';
import EventDescription from './screens/EventDescription';

const events = [
  {
    id: 1,
    title: 'Event 1',
    imageUrl: 'https://via.placeholder.com/150',
    dateTime: '2024-05-01 10:00 AM',
    locationMap: 'https://example.com/location1',
    about: 'This is event 1 description.'
  },
  {
    id: 2,
    title: 'Event 2',
    imageUrl: 'https://via.placeholder.com/150',
    dateTime: '2024-05-02 02:00 PM',
    locationMap: 'https://example.com/location2',
    about: 'This is event 2 description.'
  },
  {
    id: 3,
    title: 'Ballet',
    imageUrl: 'https://pointemagazine.com/wp-content/uploads/2022/04/Demitra-Bereveskos-in-Serenade.-Choreography-by-George-Balanchine.-%C2%A9-The-Balanchine-Trust.-Photo-by-Rosalie-OConnor.-4-CROP_Web_R1crop2.jpg',
    dateTime: '2024-05-03 07:00 PM',
    locationMap: 'https://example.com/ballet-location',
    about: 'The ballet performance description.'
  },
];

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