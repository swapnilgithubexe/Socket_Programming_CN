// No need to change the pre-written code
// Implement the features in io.on() section
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join", ({ username, room }) => {
        socket.join(room);
        console.log(`${username} joined room: ${room}`);

        // Send a welcome message to the user
        socket.emit("message", { username: "admin", message: `Welcome ${username} to room ${room}!` });

        // Notify other users in the room
        socket.broadcast.to(room).emit("message", { username: "admin", message: `${username} has joined the chat.` });
    });

    socket.on("sendMessage", ({ username, room, message }) => {
        console.log(`Message from ${username} in ${room}: ${message}`);

        // Send the message to all users in the same room
        io.to(room).emit("message", { username, message });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
    });
});
