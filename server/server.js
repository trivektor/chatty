const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

// https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

io
  .of('/chatty')
  .on('connection', (socket) => {
    // https://stackoverflow.com/questions/13143945/dynamic-namespaces-socket-io
    const roomId = socket.handshake['query']['id'];

    socket.join(roomId);
    socket.on('message', ({message, name}) => {
      io.of('/chatty').to(roomId).emit('message', {message, name});
    });
  });

server.listen(PORT);
