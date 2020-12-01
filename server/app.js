const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000
//pwd : L0uF0dvrx81udHpb
const { MONGOURI } = require("./keys")
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors');
const server = http.createServer(app);
const io = socketio(server);
const { addUser, removeUser, getUser, getUsersInRoom } = require('./routes/chat');



app.use(cors());
io.on('connection', (socket) => {
    console.log('New connection');

    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
    
        if(error) return callback(error);
    
        socket.join(user.room);
    
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
    
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    
        callback();
      });
    
      socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
    
        io.to(user.room).emit('message', { user: user.name, text: message });
    
        callback();
       });

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);

        if(user) {
          io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
          io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
      })    
})


mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
    console.log("DB connected");
})

mongoose.connection.on('error', (err) =>{
    console.log(err);
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
app.use(require('./routes/chain'))

server.listen(PORT, () =>{
    console.log("server running");
})

