const SocketIO = require('socket.io');

const Player = require('./Player');
const Firewall = require('./Firewall');
const Upgrade = require('./Upgrade');
const HackingHandler = require('./HackingHandler');
const DatabaseManager = require('./DatabaseManager');

module.exports = class Server{
	/**
	 * 
	 * @param {http.Server} httpServer 
	 */
	constructor(httpServer){
		/** @type {SocketIO.Server}*/ this.io = SocketIO(httpServer, { transports: ['polling', 'websocket'], cors: { origin: 'http://s0urce.io', credentials: true } });
		/** @type {Array<SocketIO.Socket>} */ this.sockets = [];
		this.databaseManager = new DatabaseManager();
		
		setInterval(() => this.runInterval(), 4000);
		this.io.on('connection', socket => {
			console.log(`Connection from ${socket.id}`);

			socket.player = new Player(this, socket);
			socket.on('signIn', data => socket.player.signIn(data.name, data.password, data.register));
			socket.on('playerRequest', data => socket.player.playerRequest(data));
			socket.on('disconnect', () => socket.player.disconnect());

			this.sockets.push(socket);
		});
	}

	/**
	 * @returns {Array<Player>}
	 */
	getAllPlayers(){
		return this.sockets.map(socket => socket.player);
	}

	getPlayer(id){
		return this.getAllPlayers().filter(player => player.id == id)[0];
	}

	emitToAll(event, data){
		this.sockets.filter(socket => socket.player.ingame).map(socket => socket.emit(event, data));
	}

	runInterval(){
		var task = { task: 2008, data: [], topFive: [] };
		var players = this.getAllPlayers().filter(player => player.ingame).sort((a, b) => b.level - a.level);

		for(var i = 0; i < players.length; i++) task.data.push({
			achievmentRank: players[i].achievmentRank,
			comm: {
				first: players[i].comm[0],
				second: players[i].comm[1]
			},
			country: players[i].country,
			desc: players[i].description,
			id: players[i].id,
			level: players[i].level,
			name: players[i].username,
			rank: i + 1
		});
		task.topFive = [...task.data].slice(0, 3);
		
		this.emitToAll('mainPackage', { unique: [task] });
	}
}