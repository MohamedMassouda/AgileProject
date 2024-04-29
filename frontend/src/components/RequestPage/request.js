import React, { useEffect, useState } from 'react';

function EventRequestPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    category:'',
  });

  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "Music"
    },
    {
      id: "2",
      name: "Sport"
    },
    {
      id: "3",
      name: "Test",
    }
  ])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="eventName"
        placeholder="Event Name"
        value={formData.title}
        onChange={handleChange}
      />
      <input
        type="text"
        name="eventDescription"
        placeholder='Event Description'
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="eventLocation"
        placeholder="Event Location"
        value={formData.location}
        onChange={handleChange}
      />
      <textarea
        type="date"
        name="eventDate"
        placeholder="Event Date"
        value={formData.date}
        onChange={handleChange}
      />
      <select
        name="eventCategory"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="Select Category">Select Category</option>

        {categories.map((category) => {
          return <option value={category.id}>{ category.name }</option>
        })}
        
      </select>

      <button type="submit">Submit</button>
    </form>
  );
}

export default EventRequestPage;
