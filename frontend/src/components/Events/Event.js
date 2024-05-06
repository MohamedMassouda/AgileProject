function Event({ event }) {
    return (
      <div className="event">
        <img src={event.imageUrl} alt={event.title} />
        <h2>{event.title}</h2>
        <p>{event.date}</p>
        <p>{event.location}</p>
        <h1>{event.category}</h1>
      </div>
    );
  }
export default Event; 