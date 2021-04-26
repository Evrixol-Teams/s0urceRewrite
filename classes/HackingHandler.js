const Server = require('./Server');
const Player = require('./Player');
const Firewall = require('./Firewall');
const Upgrade = require('./Upgrade');

const imageToWord = require('../utils/imageToWord.json');

module.exports = class HackingHandler{
    /**
     * @param {Player} hacker 
     * @param {Player} victim 
     * @param {Number} firewallID 
     */
    constructor(hacker, victim, firewallID){
        this.hacker = hacker;
        this.victim = victim;
        this.firewallID = firewallID;

        /** @type {Firewall} */ this.firewall = victim.firewall[this.firewallID];
        /** @type {String} */ this.hackingWord = null;
        /** @type {String} */ this.hackingWordIndex = null;
        /** @type {String} */ this.hackingWordDifficulty = null;

        this.generateHackingWord();

        var task333 = {task: 333, opt: 1, url: { t: this.hackingWordDifficulty, i: this.hackingWordIndex }};
        var task2000 = { task: 2000, data: { type: 0, id: this.hacker.id, name: this.hacker.username, port: ['A', 'B', 'C'][firewallID] } };
        var task2002 = { task: 2002, df: 1 };

        this.victim.socket.emit('mainPackage', { unique: [task2000] });
        this.hacker.socket.emit('mainPackage', { unique: [task333, task2002] });
    }

    generateHackingWord(){
        this.hackingWordDifficulty = ['e', 'm', 'h'][this.firewall.strength];
        if(this.firewall.strength == 1) Math.random() < 0.5 ? 'e' : 'm';
        if(this.firewall.strength == 2) Math.random() < 0.5 ? 'm' : 'd';
        
        this.hackingWordIndex = Math.floor(Math.random() * imageToWord[this.hackingWordDifficulty].length);
        this.hackingWord = imageToWord[this.hackingWordDifficulty][this.hackingWordIndex];
    }

    /**
     * @param {String} word 
     */
    tryHackingWord(word){
        if(word == this.hackingWord){
            this.firewall.charges--;

            if(this.firewall.charges <= 0) this.finishHack()
            this.generateHackingWord();

            var task333Opt1 = { task: 333, opt: 1, url: { t: this.hackingWordDifficulty, i: this.hackingWordIndex }};
            var task333Opt2 = { task: 333, opt: 2 };
            var task2004 = { task: 2004, state: { charges: this.firewall.charges, max_charges: this.firewall.max_charges} };
            this.hacker.socket.emit('mainPackage', { unique: [task333Opt1, task333Opt2, task2004] });

            this.victim.update();
        }else{
            var task333 = { task: 333, opt: 0 };
            this.hacker.socket.emit('mainPackage', { unique: [task333] });
        }
    }

    finishHack(){
        this.firewall.is_hacked = true;

        // Emit appropriate events
    }
}