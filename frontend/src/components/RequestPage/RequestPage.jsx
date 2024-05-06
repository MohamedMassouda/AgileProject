
import React, { useEffect, useState } from "react";
import "./RequestPage.css";

function EventRequestPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
  });
  const [newCategory, setNewCategory] = useState(""); 
  const [categories, setCategories] = useState([
    {
      id: "1",
      name: "Music",
    },
    {
      id: "2",
      name: "Sport",
    },
    {
      id: "3",
      name: "Test1",
    },
    {
      id: "4",
      name: "Test2",
    },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      const newCategoryId = String(categories.length + 1);
      const newCategoryObj = {
        id: newCategoryId,
        name: newCategory,
      };
      setCategories([...categories, newCategoryObj]);
      setFormData({ ...formData, category: newCategoryId });
      setNewCategory(""); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Event Request Form</h2>
        <input
          type="text"
          name="title"
          placeholder="Event Name"
          className="input"
          onChange={handleChange}
        />
        <textarea
          type="text"
          name="description"
          placeholder="Event Description"
          className="textarea"
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Event Location"
          className="input"
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="date"
          placeholder="Event Date"
          className="input"
          onChange={handleChange}
        />
        <p>Select category</p>
        <select
          name="category"
          className="select"
          multiple 
          onChange={handleChange}  
        >
          
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>

        <input
          type="text"
          placeholder="New Category"
          className="select"
          value={newCategory}
          onChange={handleCategoryChange}
        />
        <button type="button" className="button1" onClick={handleAddCategory}>
          Add Category
        </button>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EventRequestPage;
