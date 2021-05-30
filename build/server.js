"use strict";
const { addMember, getMember, deleteMember, getMembers } = require('./members');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const cors = require('cors');
const PORT = process.env.PORT || 5000;
app.use(cors());
io.on('connection', (socket) => {
    socket.on('login', ({ name, room }, callback) => {
        const { user, error } = addMember(socket.id, name, room);
        if (error)
            return callback(error);
        socket.join(user.room);
        socket.in(room).emit('notification', { title: 'Кто то вошел', description: `${user.name} присоеденился к нам` });
        io.in(room).emit('users', getMembers(room));
        callback();
    });
    socket.on('privateMessage', (message, receiver) => {
        console.log(message);
        console.log(receiver);
        const user = getMember(socket.id);
        console.log(user);
        io.to(receiver).emit('private', { user: user.name, text: message });
    });
    socket.on('sendMessage', (message) => {
        const user = getMember(socket.id);
        io.in(user.room).emit('message', { user: user.name, text: message });
    });
    socket.on("disconnect", () => {
        console.log("User " + socket.id);
        const user = deleteMember(socket.id);
        if (user) {
            io.in(user.room).emit('notification', { title: 'Кто то вышел', description: `${user.name} только что вышел из комнаты` });
            io.in(user.room).emit('users', getMembers(user.room));
        }
    });
});
app.get('/', (req, res) => {
    res.send("Сервер работает!");
});
http.listen(PORT, () => {
    console.log(`Listening to ${PORT}`);
});
