var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/messages', async (req, res) => {
  try {
    console.log(req.body);
    res.sendStatus(200);
  }
  catch (error) {
    res.sendStatus(500);
    return console.log('error', error);
  }
  finally {
    console.log('Message Posted')
  }
})

io.on('connection', function (socket) {
  console.log("An user has connected");

  socket.on('disconnecting', function (data) {
    console.log("disconnecting");
    console.log(socket.rooms);
    console.log(socket.id);
  });

  socket.on('turn', function (data) {
    console.log(socket.id + "-" + data.toId);
    //io.to(socket.id).emit('message', data);
    socket.emit('message', data);
  });
});

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
