/*
here goes our attempt to revive the s0urce.io game
with a private server and a custom client

*/


const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Database = require("@replit/database");
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
app.use(cookieParser());

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
  res.sendFile(__dirname+"/client/index.html");
})

////////////////////////////////////////////////////////////////////////////////////////////// admin panel
/*
app.use((req, res, next) => {
  //get the token from the cookies
  const authToken = req.cookies['AuthToken'];
  if (!authToken) return console.error('invalid authentication token X')
  //inject the user to the request
  if (authToken) {req.user = authTokens[authToken];}
  next();
})
const users = [
  // This user is added to the array to avoid creating a new user on each restart
  {
    username: 'johndoe@email.com',
    // This is the SHA256 hash for value of `password`
    password: 'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='
  }
];
const crypto = require('crypto');

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256');
  const hash = sha256.update(password).digest('base64');
  return hash;
}
const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}
const authTokens = {};

app.get('/admin', (req, res) => {
  res.sendFile(__dirname+"/admin/adminlogin.html");
})

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body
  const hashedPassword = getHashedPassword(password);

  const user = users.find(u => {
    return u.email === email && hashedPassword === u.password
  });

  if (user) {
    const authToken = generateAuthToken();
    // store authentication token
    authtokens[authToken] = user;
    //setting the auth token in cookies
    res.cookie('AuthToken', authToken);
    //redirect the user to the admin panel
    res.redirect('/panel')
  } else {
    res.redirect('/admin/login')
  }
})

app.get('/protected', (req, res) =>{
  if (req.user) {
    res.sendfile(__dirname+"/admin/adminpanel.html");
  } else {
    res.redirect('/')
  }
});

*/
//////////////////////////////////////////////////////////////////////////////////////////////// end admin

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