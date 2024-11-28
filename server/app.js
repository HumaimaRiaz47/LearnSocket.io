import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

// Initialize Express and HTTP server
const app = express();
const server = createServer(app);

// Setup Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware for CORS
app.use(cors());

// Route for base endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Socket.IO connection logic
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Emit welcome message to the connected user
  socket.emit("welcome", `Welcome to the server, ${socket.id}`);

  // Notify other users about the new connection
  socket.broadcast.emit("welcome", `${socket.id} joined the server`);

  // Handle incoming message event
  socket.on("message", ({ room, message }) => {
    console.log(`Room: ${room}, Message: ${message}`);
    io.to(room).emit("receive-message", message); // Emit message to the specific room
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
