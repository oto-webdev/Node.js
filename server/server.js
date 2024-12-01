import { Server } from "socket.io"; 
import http from 'http';
import express from 'express';

const app = express();
const port = 3000;
const server = http.createServer(app);

const io = new Server(server); 

app.use(express.static("public"));

let users = new Set();

io.on("connection", (socket) => {
    console.log("User is connected");

    socket.on("join", (username) => {
        users.add(username);
        io.emit("userJoined", username);
        io.emit("userList", Array.from(users));
    });

    socket.on("sendMessage", (message) => {
        io.emit("chatMessage", message); 
    });

    socket.on("disconnect", () => {
        users = new Set(Array.from(users).filter((user) => user !== socket.username));
        io.emit("userLeft", socket.username); 
        io.emit("userList", Array.from(users)); 
        console.log("User disconnected");
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
