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
  socket.on("disconnect", () => {
    console.log("Socket connection disconnected");

  })
})

server.listen(3100, () => {
  console.log("App is listening on port 3100");

})