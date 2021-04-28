
const Server = require('./Server');
const Firewall = require('./Firewall');
const Upgrade = require('./Upgrade');
const HackingHandler = require('./HackingHandler');
const DatabaseManager = require('./DatabaseManager');

const shop = require('../client/json/shop.json');

module.exports = class Player{
	/**
	 * @param {Server} server
	 * @param {SocketIO.Socket} socket 
	 */
	constructor(server, socket){
		this.server = server;
		this.socket = socket;
		this.id = this.socket.id;

		/** @type {String | null} */ this.username = null;
		this.achievmentRank = 0;
		this.comm = ['.........', '.........'],
		this.country = 'kp';
		this.description = 'no description';
		this.level = 1;
		/** @type { HackingHandler | null } */ this.hackingHandler = null;
		/** @type { Array<HackingHandler> } */ this.hackers = null;

		this.coins = { value: 150000000000, rate: 0.0002 };
		this.firewall = [new Firewall(this), new Firewall(this), new Firewall(this)]
		this.market = shop.Market.map((miner, index, array) => new Upgrade(this, index, miner.price));
		this.market[0].amount++;

		this.interval = setInterval(() => this.coins.value += this.coins.rate, 1000);
		this.update();
	}

	get ingame(){
		return !(this.username === null);
	}

	set ingame(value){
		this.username = value ? value : null;
	}

	/**
	 * @param {Player} player 
	 * @param {String} message 
	 */
	sendChatMessage(player, message){
		this.socket.emit('mainPackage', { unique: [{ task: 2006, id: player.id, name: player.username, message: message }] });
	}

	update(){
		this.socket.emit('mainPackage', { unique: [
			{ task: 2009, content: { id: this.id, level: this.level, achievmentRank: this.achievmentRank, desc: this.description, comm: { first: this.comm[0], second: this.comm[1] }, country: this.country }},
			{
				task: 2010,
				data: {
					coins: this.coins,
					firewall: {
						"0": this.firewall[0].getData(),
						"1": this.firewall[1].getData(),
						"2": this.firewall[2].getData(),
					},
					market: {
						"0": this.market[0].getData(),
						"1": this.market[1].getData(),
						"2": this.market[2].getData(),
						"3": this.market[3].getData(),
						"4": this.market[4].getData(),
						"5": this.market[5].getData()
					}
				}
			}
		]});
	}

	/**
	 * @param {String} username 
	 * @param {String} password
	 * @param {Boolean} register
	 */
	signIn(username, password, register){
		if(username == undefined || password == undefined || username == '' || password == ''){
			this.socket.emit('alert', 'Invalid Uername/Password');
		}else{
			if(register){
				if(this.server.databaseManager.userExists(username)){
					this.socket.emit('alert', 'That Username is taken');
				}else{
					this.server.databaseManager.register(username, password);
					this.username = username;
					this.socket.emit('prepareClient', { id: this.id });
					this.update();
				}
			}else{
				var user = this.server.databaseManager.login(username, password);
				if(user){
					this.username = username;
					this.socket.emit('prepareClient', { id: this.id });
					this.update();
				}else{
					this.socket.emit('alert', 'Invalid Username/Pasword');
				}
			}
		}
	}

	playerRequest(data){
		if(!data || !data.task) return;

		switch(data.task){
			case(100):
				if(data.id == undefined || data.port == undefined) break;
				var player = this.server.getPlayer(data.id);
				if(player){
					if(this.coins.value >= this.coins.rate * 20){
						if(!player.firewall[data.port].is_hacked){
							this.coins.value -= this.coins.rate * 20;
							this.update();

							if(this.hackingHandler) this.hackingHandler.finishHack(false);
							this.hackingHandler = new HackingHandler(this, player, data.port);
						}else{
							this.socket.emit('mainPackage', { unique: [{ task: 2003, text: "This port has been closed. Try another", action: 0 }] });
						}
					}
				}else{
					this.socket.emit('mainPackage', { unique: [{ task: 2000, data: { type: 2 } }] });
				}
				break;
			case(102):
				if(data.id == undefined || data.fid == undefined) break;
				this.firewall[data.fid].upgrades[data.id].purchase(data.fid, data.id);
				break;
			case(103):
				if(data.id == undefined) break;
				this.market[data.id].purchase();
				break;
			case(104):
				if(data.desc == undefined) break;
				this.description = data.desc;
				this.update();
				break;
			case(105):
				if(data.id == undefined) break;
				var player = this.server.getPlayer(data.id);

				if(player){
					this.socket.emit('mainPackage', { unique: [{
						task: 2007,
						data: {
							id: player.id,
							name: player.username,
							level: player.level,
							desc: player.description,
							comm: {
								first: this.comm[0],
								second: this.comm[1]
							},
							achievmentRank: player.achievmentRank,
							country: player.country
						}
					}] });
				}else{
					this.socket.emit('mainPackage', { unique: [{ task: 2000, data: { type: 2 } }] });
				}

				break;
			case(106):
				if(data.text == undefined) break;
				this.hackingHandler.setHackingMessage(data.text);
				break;
			case(300):
				if(data.id == undefined || data.message == undefined) break;
				var player = this.server.getPlayer(data.id);
				if(player) player.sendChatMessage(this, data.message);
				break;
			case(777):
				if(data.word == undefined) break;
				if(this.hackingHandler) this.hackingHandler.tryHackingWord(data.word);
				break;
		}
	}

	disconnect(){
		this.server.sockets.filter(socket => socket.player.id != this.id);
		this.ingame = false;
	}
}