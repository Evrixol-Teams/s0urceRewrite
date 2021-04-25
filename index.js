/*
here goes our attempt to revive the s0urce.io game
with a private server and a custom client
*/

const config = require('./settings');
const AdRemover = require('./utils/adRemover.js');

const SocketIO = require('socket.io');
const Express = require('express');
const http = require('http');

class Upgrade{
    /**
     * @param {Player | Firewall} parent 
     * @param {Number} index 
     * @param {Number} price 
     */
    constructor(parent, index, price){
        this.parent = parent;
        this.index = index;
        this.price = price;

        this.originalPrice = this.price;
        this.amount = 0;
    }

    get type(){
        if(this.parent instanceof Player){
            return Player;
        }else{
            return Firewall;
        }
    }

    get rate(){
        if(this.type == Player){
            return [0.0002, 0.0075, 0.0390, 1.0700, 6.4000, 53.330][this.index];
        }else{
            return 0;
        }
    }

    getData(){
        var data = {
            amount: this.amount,
            f_cost: this.price,
            s_cost: this.originalPrice
        }
        if(this.type == Player){
            data.rate = this.rate;
        }

        return data;
    }

    purchase(){
        /** @type {Player} */ var player = this.type == Player ? this.parent : this.parent.player;

        if(player.coins.value >= this.price){
            player.coins.value -= this.price;
            this.amount++;

            if(this.type == Player){
				this.price = ((this.originalPrice * Math.pow(1.1, 1)) * Math.pow(1.1, this.amount - 1));
                player.coins.rate += this.rate;
            }else{
                this.price += this.price;
                this.parent[['charges', 'max_charges', 'strength', 'regeneration'][this.index]] += this.index == 0 || this.index == 1 ? 5 : 1;
            }

            player.update();
        }
    }
}

class Firewall{
	/**
	 * @param {Player} player 
	 */
	constructor(player){
		this.player = player;

		this.charges = 10;
		this.max_charges = 10;
		this.strength = 0;
		this.regeneration = 0;
		this.nextRegenIn = 120;
		this.charge_cool = 0;
		this.recoveryIn = 30;
		this.is_hacked = false;
		this.upgrades = [new Upgrade(this, 0, 0.5), new Upgrade(this, 1, 6), new Upgrade(this, 2, 10), new Upgrade(this, 3, 3)]

		this.interval = setInterval(() => this.runInterval(), 1000);
	}

	runInterval(){
		if(this.regeneration != 0){
			this.nextRegenIn--;
			if(this.nextRegenIn <= 0){
				this.nextRegenIn = 120;
				this.charges += this.regeneration;
			}
		}

		if(this.is_hacked){
			this.recoveryIn--;
			if(this.recoveryIn <= 0){
				this.is_hacked = false;
				this.charges = this.max_charges;
				this.nextRegenIn = 30;
			}
		}

		if(this.charge_cool > 0) this.charge_cool--;
	}

	getData(){
		var data = {
			charges: this.charges,
			max_charges: this.max_charges,
			strength: this.strength,
			regeneration: this.regeneration,
			nextRegenIn: this.nextRegenIn,
			charge_cool: this.charge_cool,
			recoveryIn: this.recoveryIn,
			is_hacked: this.is_hacked,
			upgrades: { "0": this.upgrades[0].getData(), "1": this.upgrades[1].getData(), "2": this.upgrades[2].getData(), "3": this.upgrades[3].getData() }
		}

		return data;
	}
}

class Player{
	/**
	 * @param {Server} server
	 * @param {SocketIO.Socket} socket 
	 */
	constructor(server, socket){
		this.server = server;
		this.socket = socket;
		this.id = this.socket.id;

		this.firstMessage = false;
		this.username = null;
		this.achievmentRank = 0;
		this.comm = { first: '.........', second: '.........' };
		this.country = 'kp';
		this.description = 'no description';
		this.level = 1;

		this.coins = { value: 0.1500, rate: 0.0000 };
		this.firewall = [new Firewall(this), new Firewall(this), new Firewall(this)]
		this.market = [
			new Upgrade(this, 0, 0.006,),
			new Upgrade(this, 1, 0.25,),
			new Upgrade(this, 2, 18.4,),
			new Upgrade(this, 3, 512,),
			new Upgrade(this, 4, 3072,),
			new Upgrade(this, 5, 25600,)
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
		}
	}
}

class Server{
	/**
	 * 
	 * @param {http.Server} httpServer 
	 */
	constructor(httpServer){
		/** @type {SocketIO.Server}*/ this.io = SocketIO(httpServer, { transports: ['polling', 'websocket'], cors: { origin: 'http://s0urce.io', credentials: true } });
		/** @type {Array<SocketIO.Socket>} */ this.sockets = [];

		setInterval(() => this.runInterval(), 4000);
		this.io.on('connection', socket => {
			console.log(`Connection from ${socket.id}`);

			socket.player = new Player(this, socket);
			socket.on('signIn', data => socket.player.signIn(data.name));
			socket.on('playerRequest', data => socket.player.playerRequest(data));
			socket.on('disconnect', () => this.sockets = this.sockets.filter(s => s.id != socket.id));

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
		var players = this.getAllPlayers().filter(player => player.ingame).sort((a, b) => a.level - b.level);

		for(var i = 0; i < players.length; i++) task.data.push({
			achievmentRank: players[i].achievmentRank,
			comm: players[i].comm,
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

(async () => {
	const app = Express();
	app.get('/', (req, res) => res.sendFile(__dirname + '/client/index.html'));
	app.use('/client', Express.static(__dirname + '/client'));
	app.use('/ads', AdRemover);

	const httpServer = http.createServer(app);
	const server = new Server(httpServer);

	httpServer.listen(config.port, () => console.log('Server Started'));
})();