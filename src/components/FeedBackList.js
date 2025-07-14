import React, { useState } from "react";

function FeedBackList({ feedbackList, handleDelete }) {
  return (
    <div>
      <h1>FeedBackList</h1>
      <ul>
        {feedbackList.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> ({item.email}) - Rated: {item.rating}⭐
            <br />
            {item.message}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FeedBackList;
