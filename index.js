/*
here goes our attempt to revive the s0urce.io game
with a private server and a custom client

*/


const express = require('express');
const Database = require("@replit/database")
var httpServer = require('http').createServer;
var utils = {
  startPacket: require('./utils/startpacket.js'),
  playerCreator: require('./utils/playercreator.js'),
  taskmanager: require('./utils/taskmgr.js')
}
var players = [
  utils.playerCreator('Server','IN-PROGRESS',5,6969,"Welcome to the S0urce.io Private Server 0.1 Alpha!",69)
];

var socketlist = [];

const app = express();

server = httpServer(app);

var io = require('socket.io')(server)

/*app.get('/client/css/:filename', (req, res) => {
  res.type('text/css');
  res.sendFile(__dirname+"/client/css/"+req.params.filename)
});
app.get('/client/js/:filename', (req, res) => {
  res.type('text/javascript');
  res.sendFile(__dirname+"/client/js/"+req.params.filename)
});*/
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/client/index.html")
})

app.get('/adminlogin', (req, res) => {
  res.sendFile(__dirname+"/client/adminlogin.html")
})

io.on('connection',(socket) => {
  socket.on('signIn',(c) => {
    socket.emit('prepareClient',socket.id);
    utils.startPacket(socket);
    if(c.name.includes("Cheat")){
    addPlayer(
      utils.playerCreator(
        c.name.replace("Cheat", ""),
        socket.id,
        5,
        150,
        'dont try to beat me loser',
        players.length
      )
    )
    socketlist.push(socket);
    }else{
    addPlayer(
      utils.playerCreator(
        c.name,
        socket.id,
        0,
        0,
        'No quote',
        players.length
      )
    )
    socketlist.push(socket);
    }
  })
})
setInterval(() => {
  socketlist.forEach((socket) => {
    displayPlayers(socket);
  })
},1000)

function displayPlayers(socket) {
  socket.emit('mainPackage',{
    unique: [
      {
        task: 2008,
        data: players,
        topFive: [
          utils.playerCreator('Server','IN-PROGRESS',5,6969,"Welcome to the S0urce.io Private Server 0.1 Alpha!",69)
        ]
      }
    
    ]
        
  })
}
function addPlayer(data) {
  players.push(data);
}


// some crazy stuff going on with MIME so i changed the position
app.use('/client',express.static(__dirname+"/client"))

server.listen(3000, () => {
  console.log('server started');
});