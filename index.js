import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Static files serve karne ke liye
app.use(express.static(path.resolve('./public')));

let activeUsers = 0;

io.on('connection', (socket) => {
    activeUsers++;
    io.emit('user-count', activeUsers);

    // Message object receive karein
    socket.on('chat-message', (data) => {
        io.emit('chat-message', data);
    });

    socket.on('disconnect', () => {
        activeUsers--;
        io.emit('user-count', activeUsers);
    });
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});