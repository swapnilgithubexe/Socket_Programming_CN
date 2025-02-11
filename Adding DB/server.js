// No need to change pre-written code.
// Make necessary imports here.
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { Message } from "./message.schema.js"

export const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Connection made.");

    socket.on("join", (data) => {
        // Emit a welcome message to the user who joined
        socket.emit("message", { text: `Welcome, ${data.username}!` });



        // Broadcast a message to all other users in the same room
        socket.broadcast.to(data.room).emit("message", {
            text: `${data.username} has joined the room.`
        });

        // Join the room
        socket.join(data.room);
    });

    socket.on("sendMessage", async (data) => {

        // write your code here
        const newMessage = new Message({ username: data.username, text: data.text, room: data.room, timestamp: new Date() })

        newMessage.save();

        // Broadcast the received message to all users in the same room
        io.to(data.room).emit("message", {
            username: data.username,
            text: data.message
        });
    });

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
    });
});


