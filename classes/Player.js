
const Server = require('./Server');
const Firewall = require('./Firewall');
const Upgrade = require('./Upgrade');
const HackingHandler = require('./HackingHandler');

module.exports = class Player{
	/**
	 * @param {Server} server
	 * @param {SocketIO.Socket} socket 
	 */
	constructor(server, socket){
		this.server = server;
		this.socket = socket;
		this.id = this.socket.id;

		this.firstMessage = false;
		/** @type {String | null} */ this.username = null;
		this.achievmentRank = 0;
		this.comm = { first: '.........', second: '.........' };
		this.country = 'kp';
		this.description = 'no description';
		this.level = 1;
		/** @type { HackingHandler | null } */ this.hackingHandler = null;

		this.coins = { value: 1500, rate: 0.0000 };
		this.firewall = [new Firewall(this), new Firewall(this), new Firewall(this)]
		this.market = [
			new Upgrade(this, 0, 0.006),
			new Upgrade(this, 1, 0.25),
			new Upgrade(this, 2, 18.4),
			new Upgrade(this, 3, 512),
			new Upgrade(this, 4, 3072),
			new Upgrade(this, 5, 25600)
		]
		this.market[0].amount++;

		this.interval = setInterval(() => this.coins.value += this.coins.rate, 1000);
	}

	get ingame(){
		return !(this.username == null);
	}

	/**
	 * @param {Player} player 
	 * @param {String} message 
	 */
	sendChatMessage(player, message){
		var task = { task: 2006, id: player.id, name: player.username, message: message }
		this.socket.emit('mainPackage', { unique: [task] });
	}

	update(){
		var task2009 = { task: 2009, content: { id: this.id, level: this.level, achievmentRank: this.achievmentRank, desc: this.description, comm: this.comm, country: this.country } }
		var task2010 = {
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

		this.socket.emit('mainPackage', { unique: [task2009, task2010] });
	}

	/**
	 * @param {String} username 
	 */
	signIn(username){
		this.username = username;
		this.socket.emit('prepareClient', { id: this.id });
		this.update();
	}

	playerRequest(data){
		if(!data || !data.task) return;
		if(!this.firstMessage){
			this.firstMessage = true;
			this.coins.rate = 0.0002;
			this.update();
		}

		switch(data.task){
			case(100):
				if(data.id == undefined || data.port == undefined) break;
				var player = this.server.getPlayer(data.id);
				if(player && this.coins.value >= this.coins.rate * 20){
					this.coins.value -= this.coins.rate * 20;
					this.update();

					this.hackingHandler = new HackingHandler(this, player, data.port);
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
					var task = {
						task: 2007,
						data: {
							id: player.id,
							name: player.username,
							level: player.level,
							desc: player.description,
							comm: player.comm,
							achievmentRank: player.achievmentRank,
							country: player.country
						}
					};

					this.socket.emit('mainPackage', { unique: [task] });
				}else{
					var task = { task: 2000, data: { type: 2 } };
					this.socket.emit('mainPackage', { unique: [task] });
				}

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
}