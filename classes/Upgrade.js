
const Server = require('./Server');
const Player = require('./Player');
const Firewall = require('./Firewall');

module.exports = class Upgrade{
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
        if(this.parent.id){
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