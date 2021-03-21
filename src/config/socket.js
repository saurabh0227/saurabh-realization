const socket = require('socket.io');

let io = null;
let clients = 0;

exports.socketInit = (server) => {
  io = socket(server);
  if (io) {
    io.on('connection', (socket) => {
      console.log(`client connected : ${++clients}`);
      socket.on('disconnect', () => {
        console.log(`Client disconnected: ${--clients}`);
      });
    });
  }
};

exports.sendSocketMsg = (msg, data) => {
  if (io) {
    console.log('Socket msg: ' + msg);
    io.sockets.emit(msg, data);
  }
};
