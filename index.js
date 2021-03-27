/*
here goes our attempt to revive the s0urce.io game
with a private server and a custom client


hey nicejs, are you still active?
I guess not


ok instead of burp im just gonna log websocket through hijacking the websocket module on browsers
check utils/websocket-scout.js
~Yours Truly#4285

and what about the playerdebugmode script or chrome developer tools?

I guess those would work, but it's probably harder to find it on developer tools?
btw I found mainPackage info https://replit.com/@s0urceiorw/s0urce-server#client/js/clientD-fix.js:1729

*/


const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Database = require("@replit/database");
var httpServer = require('http').createServer;
const utils = {
  startPacket: require('./utils/startpacket.js'),
  playerCreator: require('./utils/playercreator.js'),
  taskmanager: require('./utils/taskmgr.js'),
  adRemover: require('./utils/adRemover.js')
}
var players = {
  "1": utils.playerCreator('Server', 'IN-PROGRESS', 5, 6969, "Welcome to the S0urce.io Private Server 0.1 Alpha!", 69)
};

var socketlist = {};

const app = express();
app.use(cookieParser());

server = httpServer(app);

var io = require('socket.io')(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

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

//                                 why is this commented out?? delete it if you don't need it //////
//--- just in case somthing breaks
/*io.on('connection',(socket) => {
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
      ),
      socket.id
    )
    socketlist.push(socket);
    }else{
    addPlayer(
      utils.playerCreator(
        c.name,
        socket.id,
        0,
        1,
        'No quote',
        Object.keys(players).length,
        ["not hacked yet",".........."]
      ),
      socket.id
    )
    socket.playerid=socketlist.push(socket);
    }
  })
  socket.on('disconnect',() => {
    socketlist.splice(socket.playerid,1)
    delete players[socket.id];
    
  })
})*/
//added try catch logic >:D
io.on('connection', (socket) => {
try{
  var pkgEmit = pkgEmitCreate(socket);
  // In case of 'signIn' event trigger not having appropriate name data, catch exception & set username to 'AnonXXX'.
  socket.on('signIn', (data) => {
    try {
      var name = data.name;
    } catch (err) {
      var name = "Anon" + (Math.floor(Math.random() * 999) + 1).toString()
    }
    socket.player = {
      name: name,
      rank: 0,
      level: 1,
      comms: {
        first: ".........",
        second: "........."
      }
    }
    socketlist[name] = socket;

    addPlayer(utils.playerCreator(
      name,
      socket.id,
      socket.player.rank,
      socket.player.level,
      "",
      Object.keys(players).length, [socket.player.comms.first, socket.player.comms.second]
    ), socket.id)

    socket.emit('prepareClient', socket.id);
    utils.startPacket(socket);
  })
  socket.on('disconnect', () => {
    delete socketlist[socket.id];
    delete players[socket.id];
  })
  const firewall_ports = {
    0: 'A',
    1: 'B',
    2: 'C'
  };
  socket.on('playerRequest', (data) => {
    console.log(data);
    switch (data.task) {
      case 666: // restart
        socket.player = {
          name: name,
          rank: 0,
          level: 1,
          comms: {
            first: ".........",
            second: "........."
          }
        }
        socketlist[name] = socket;

        addPlayer(utils.playerCreator(
          name,
          socket.id,
          socket.player.rank,
          socket.player.level,
          "",
          Object.keys(players).length, [socket.player.comms.first, socket.player.comms.second]
        ), socket.id)
        break;
      case 300:
        console.log("talking (case 300)");
        break;
      case 100:
        port = firewall_ports[data.port];
        console.log("player with id " + socket.id + " hacking player with id " + data.id + " on port " + port);
        //socket.emit()
        ///////////////////////////////////////////////help what do i need to input to socket.emit
        break;
      case 103:
        console.log("player with id " + socket.id + " is trying to buy something with id " + data.id)
        break;
      case 102:
        port = firewall_ports[data.fid];
        console.log("something shall be upgraded (thing " + data.id + ")at port " + port);
        break;
      case 777: // eg {"task":777,"word":"left"}
        console.log("check word typed in cdm for player with id: " + socket.id)
        break;
      case 300: // send message eg {"task":300,"id":"player-id","message":"hi"}
        break;
    }
  });
}
catch(err){console.error(err);socket.close(1000);}
});

setInterval(() => {
  for (var item in socketlist) {
    socket = socketlist[item]
    displayPlayers(socket);
  }
}, 4000)
;
function displayPlayers(socket) {
  socket.emit('mainPackage', {
    unique: [{
      task: 2008,
        data: Object.entries(players).map((x, y) => {
          return x[1]
        }),
        topFive: [
          utils.playerCreator('Server', 'IN-PROGRESS', 5, 6969, "Welcome to the S0urce.io Private Server 0.1 Alpha!", 69)
        ]
    }]
  })
}

function addPlayer(data, id) {
  players[id] = data;
}

function pkgEmitCreate(socket) {
  return function pkgEmit(...data) {
    socket.emit({
      unique: data
    });
  }
}


// some crazy stuff going on with MIME so i changed the position
app.use('/client', express.static(__dirname + "/client"));
app.use('/ads', utils.adRemover);

server.listen(3000, () => {
  console.log('server started');
});