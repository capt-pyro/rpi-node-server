const path = require('path');
const http = require('http');
var basicAuth = require('basic-auth-connect');
const express = require('express');
const SOCKETIO = require('socket.io');
const moment = require('moment');
const bodyParser = require('body-parser');
const {Temp} = require('./models/temperature');
const {generateTempObj} = require('./utils/TempObjGen');
const mongoose = require('mongoose');
const {authencrypt} = require('./middleware/authencrypt');
var promise = mongoose.connect('mongodb://localhost:27017/rpi_temp', {
  useMongoClient: true,
})

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const app = express();
//app.use(basicAuth('edgesensor', 'Crafty20**'));
const server = http.createServer(app);
const io = SOCKETIO(server);


app.use(express.static(publicPath));
app.use(bodyParser.json());

app.post('/temp',authencrypt, (req,res) => {
  console.log(req.body);
  var temp = new Temp({
    temperature: req.body.temp,
    humidity: req.body.humid,
    sentAt: new Date().getTime()
  });
  temp.save().then((temp) => {
    Temp.find({}).sort({_id:-1}).limit(30).then((temps) => {
      io.sockets.emit("currTemp", {tempArr: temps});
    });
    res.send(temp);
  },(err) => {
    res.status(400).send(err);
  });
});

//start connection with a client
io.on('connection', (socket) => {

    console.log('User Connected');
  socket.on('disconnect', () => {
    console.log(`User disconnected`);
  });
});

server.listen(port,() => {
  console.log(`Express listening on port ${port}`);
});
