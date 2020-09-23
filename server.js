var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var iosocket = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/messages', async (req, res) => {
  try {
    iosocket.broadcast.emit('message', req.body);
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

iosocket.on('connection', () => {
  console.log('a user is connected')
})

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});
