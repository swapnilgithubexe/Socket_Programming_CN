import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";

const app = express();

//http server (to start the connection)
const server = http.createServer(app);

//socket server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

//socket events
io.on("connection", (socket) => {
  console.log("Socket sonnection established");

  socket.on("join", (data) => {
    socket.username = data;
  })
  socket.on("new_message", (message) => {

    let userMessage = {
      username: socket.username,
      message: message
    }
    //broadcast message
    socket.broadcast.emit("broadcast_message", userMessage);
  });
  socket.on("disconnect", () => {
    console.log("Socket connection disconnected");

  })
})

server.listen(3100, () => {
  console.log("App is listening on port 3100");

})