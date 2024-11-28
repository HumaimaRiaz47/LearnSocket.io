import React, { useEffect, useState } from "react";
import { Container, TextField, Typography, Button } from "@mui/material";
import { io } from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null); // State for socket instance
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");

  // Socket setup
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      setSocketId(newSocket.id);
      console.log("Connected with ID:", newSocket.id);
    });

    newSocket.on("welcome", (message) => {
      console.log(message);
    });

    // Cleanup socket connection and listeners
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (socket && message && room) {
      socket.emit("message", { message, room });
      setMessage(""); // Clear the input field after sending
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" component="div" gutterBottom>
        Welcome to Socket.IO
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        Your Socket ID: {socketId || "Connecting..."}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          label="Room"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />

        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          label="Message"
          variant="outlined"
          fullWidth
          margin="normal"
          required
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={!room || !message}
        >
          Send
        </Button>
      </form>
    </Container>
  );
};

export default App;
