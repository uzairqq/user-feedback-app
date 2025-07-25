import React, { useState } from "react";
import FeedBackList from "./FeedBackList";

function FeedBackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [feedBacks, setFeedBacks] = useState([
    {
      id: 1,
      name: "Uzair",
      email: "uzair@example.com",
      message: "Great app!",
      rating: 5,
    },
  ]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    let formErrors = {};
    let isValid = true;

    if (!name.trim()) {
      formErrors.name = "Name is required";
      isValid = false;
    }
    if (!email.trim()) {
      formErrors.email = "Email is required";
      isValid = false;
    }
    if (!message.trim()) {
      formErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(formErrors);
    if (!isValid) return;

    const newFeedback = {
      id: editingId || Date.now(), // Use existing ID if editing
      name,
      email,
      message,
      rating: 5,
    };

    if (editingId) {
      // Edit mode: Update existing item
      const updatedList = feedBacks.map((item) =>
        item.id === editingId ? newFeedback : item
      );
      setFeedBacks(updatedList);
      setEditingId(null); // reset edit mode
    } else {
      // Add mode: Add new feedback
      setFeedBacks([...feedBacks, newFeedback]);
    }

    setName("");
    setEmail("");
    setMessage("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleDelete = (id) => {
    const updatedList = feedBacks.filter((item) => item.id !== id);
    setFeedBacks(updatedList);
  };

  const handleEdit = (item) => {
    setName(item.name);
    setEmail(item.email);
    setMessage(item.message);
    setEditingId(item.id); // ← new state we’ll make
  };

  return (
    <div>
      <h1>This is Feed Back Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            autoFocus
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            cols="30"
            placeholder="Enter your feedback"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
        </div>
        {success && (
          <p style={{ color: "green" }}>Thank you for your feedback!</p>
        )}
        <div>
          <button type="submit">{editingId ? "Update" : "Submit"}</button>
        </div>
      </form>
      <FeedBackList
        feedbackList={feedBacks}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default FeedBackForm;
