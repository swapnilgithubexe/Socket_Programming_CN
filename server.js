import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import http from "http";
import { connect } from "./config.js";
import chatModel from "./chatSchema.js";

const app = express();
app.use(cors())

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
  //Load old messages here after new user joins
  chatModel.find().sort({ timestamp: 1 }).limit(50).then(message => {
    socket.emit("load_messages", message)
  }).catch(err => console.log(err)
  )
  socket.on("new_message", (message) => {

    let userMessage = {
      username: socket.username,
      message: message
    }
    const newChat = new chatModel({
      username: socket.username,
      message: message,
      timestamp: new Date()
    })
    newChat.save();
    //broadcast message
    socket.broadcast.emit("broadcast_message", userMessage);
  });
  socket.on("disconnect", () => {
    console.log("Socket connection disconnected");

  })
})

server.listen(3100, () => {
  console.log("App is listening on port 3100");
  connect();

})