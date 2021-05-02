import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function Dashboard({ token }) {
  const [user, setUser] = useState();
  async function getUser(userId, token) {
    axios
      .get(`https://localhost:5001/users/${userId}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => setUser(data.data));
    // .then((data) => console.log("???? ", data));
  }

  getUser(
    "1ab4a363-7204-415f-86d8-a445358de5b0",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJMb2dpbiI6ImRpeWEiLCJQYXNzd29yZCI6ImxhbGExMjMiLCJuYmYiOjE2MTk4MDE4NjQsImV4cCI6MTYxOTg4ODI2NCwiaWF0IjoxNjE5ODAxODY0fQ.axL3Df7Gs19L8ZPVVBVIL0NY_JP3jYeGN9122d62gdk"
  );

  return (
    <div>
      <header>
        <h2>Dashboard</h2>
        <div>Hey{user?.username}</div>
      </header>
    </div>
  );
}

export default withRouter(Dashboard);
