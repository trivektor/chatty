const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

// https://help.heroku.com/P1AVPANS/why-is-my-node-js-app-crashing-with-an-r10-error
const PORT = process.env.PORT || 8080;

const dbConnection = require('./dbconnection');
const {Message, Room} = require('./models');

const apiRouter = express.Router();

apiRouter.get('/room/:id', async (req, res) => {
  const room = await Room.findById(req.params.id);

  res.json(room);
});

apiRouter.post('/rooms', async (req, res) => {
  const room = new Room();

  room.save();

  res.json(room);
});

app.use('/api', apiRouter);
app.use(express.static(path.join(__dirname, '../build')));
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

io
  .of('/chatty')
  .on('connection', async (socket) => {
    // https://stackoverflow.com/questions/13143945/dynamic-namespaces-socket-io
    const roomId = socket.handshake['query']['id'];
    const room = await Room.findById(roomId);

    socket.join(roomId);
    socket.on('message', async ({message, name}) => {
      try {
        room.messages.push({message, name});

        await room.save();

        io.of('/chatty').to(roomId).emit('message', {message, name});
      } catch (err) {
        console.log('goes here');
        console.log({err});
      }
    });
  });

server.listen(PORT);
