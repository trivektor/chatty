const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

io.on('connection', (socket) => {
  // https://stackoverflow.com/questions/13143945/dynamic-namespaces-socket-io
  const roomId = socket.handshake['query']['id'];

  socket.join(roomId);
  socket.on('message', ({message}) => {
    io.to(roomId).emit('message', message);
  });
});

server.listen(8080);
