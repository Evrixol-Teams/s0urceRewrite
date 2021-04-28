
const Server = require('./Server');
const Player = require('./Player');
const Firewall = require('./Firewall');
const HackingHandler = require('./HackingHandler');

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
            var success = false;

            if(this.type == Player){
				this.price = ((this.originalPrice * Math.pow(1.1, 1)) * Math.pow(1.1, this.amount - 1));
                player.coins.rate += this.rate;
                success = true;
            }else{
                this.price += this.price;
                switch(this.index){
                    case(0):
                        if(this.parent.charge_cool <= 0 && !this.parent.is_hacked){
                            this.parent.charge_cool = 30;
                            this.parent.charges += 5;
                            if(this.parent.charges >= this.parent.max_charges) this.parent.charges = this.parent.max_charges;
                            success = true;
                        }
                        break;
                    case(1):
                        if(this.amount < 4){
                            this.parent.max_charges += 5;
                            success = true;
                        }
                        break;
                    case(2):
                        if(this.amount < 4){
                            this.parent.strength++;
                            success = true;
                        }
                        break;
                    case(3):
                        if(this.amount < 10){
                            this.parent.regeneration++;
                            success = true;
                        }
                        break;
                }
            }

            if(success){
                player.coins.value -= this.price;
                this.amount++;

                player.update();
            }
        }
    }
}