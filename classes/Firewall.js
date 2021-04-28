
const Server = require('./Server');
const Player = require('./Player');
const Upgrade = require('./Upgrade');
const HackingHandler = require('./HackingHandler');
const DatabaseManager = require('./DatabaseManager');

module.exports = class Firewall{
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
		if(this.regeneration != 0 && !this.is_hacked){
			this.nextRegenIn--;
			if(this.nextRegenIn <= 0){
				this.nextRegenIn = 120;
				this.charges += this.regeneration;

				this.player.update();
			}
		}

		if(this.is_hacked){
			this.recoveryIn--;
			if(this.recoveryIn <= 0){
				this.is_hacked = false;
				this.charges = this.max_charges;
				this.recoveryIn = 30;

				this.player.update();
			}
		}

		if(this.charge_cool > 0){
			this.charge_cool--;
			if(this.charge_cool <= 0){
				this.player.update();
			}
		}
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