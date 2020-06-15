const express = require('express');
const socket = require('socket.io');

const app = express();
const server = app.listen(4000, function(){
    console.log('Listening to port 4000');
})

app.use(express.static('public'));

const io = socket(server);

io.on('connection', function(socket){
    console.log('Socket connected with id:', socket.id);
    
    socket.on('chat', function(data){
        io.sockets.emit('chat', data)
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    })
});

