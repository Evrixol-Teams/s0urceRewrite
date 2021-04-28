const Server = require('./Server');
const Player = require('./Player');
const Firewall = require('./Firewall');
const Upgrade = require('./Upgrade');
const DatabaseManager = require('./DatabaseManager');

const imageToWord = require('../utils/imageToWord.json');
const ranks = require('../client/json/ranks.json');

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
        this.hackFinished = false;

        this.victim.hackers.push(this);
        this.generateHackingWord();

        this.victim.socket.emit('mainPackage', { unique: [{ task: 2000, data: { type: 0, id: this.hacker.id, name: this.hacker.username, port: ['A', 'B', 'C'][firewallID] } }] });
        this.hacker.socket.emit('mainPackage', { unique: [
            { task: 333, opt: 1, url: { t: this.hackingWordDifficulty, i: this.hackingWordIndex }}, 
            { task: 2002, df: 1 }
        ] });
    }

    generateHackingWord(){
        this.hackingWordDifficulty = ['e', '', 'm', '', 'h'][this.firewall.strength];
        if(this.firewall.strength == 1) Math.random() < 0.5 ? 'e' : 'm';
        if(this.firewall.strength == 3) Math.random() < 0.5 ? 'm' : 'd';
        
        this.hackingWordIndex = Math.floor(Math.random() * imageToWord[this.hackingWordDifficulty].length);
        this.hackingWord = imageToWord[this.hackingWordDifficulty][this.hackingWordIndex];
    }

    /**
     * @param {String} word 
     */
    tryHackingWord(word){
        if(this.victim.ingame){
            if(word == this.hackingWord){
                this.firewall.charges--;

                if(this.firewall.charges <= 0){
                    this.hackingWord = null;
                    this.hacker.socket.emit('mainPackage', { unique: [
                        { task: 333, opt: 2 },
                        { task: 2004, state: { charges: this.firewall.charges, max_charges: this.firewall.max_charges} }
                    ]});

                    this.finishHack(true);
                }else{
                    this.generateHackingWord();

                    this.hacker.socket.emit('mainPackage', { unique: [
                        { task: 333, opt: 1, url: { t: this.hackingWordDifficulty, i: this.hackingWordIndex }},
                        { task: 333, opt: 2 },
                        { task: 2004, state: { charges: this.firewall.charges, max_charges: this.firewall.max_charges} }
                    ]});

                    this.victim.update();
                }
            }else{
                this.hacker.socket.emit('mainPackage', { unique: [{ task: 333, opt: 0 }] });
            }
        }else{
            this.hacker.socket.emit('mainPackage', { unique: [{ task: 2003, text: "The target has disconnected from the server.", action: 0 }] });
        }
    }

    finishHack(success){
        if(!this.hackFinished){
            if(success){
                var hackedAmount = this.victim.coins.value * 0.05;
                if(this.victim.coins.rate * 30 > hackedAmount) hackedAmount = this.victim.coins.rate * 30;

                this.firewall.is_hacked = true;
                this.victim.hackers.map(handler => handler.hackingWord = null);
                this.victim.hackers = [];
                this.victim.coins.value -= hackedAmount;
                this.victim.socket.emit('mainPackage', { unique: [{ task: 2005, data: { port: this.firewallID, hacked: true } }]});
                this.victim.update();

                this.hacker.coins.value += hackedAmount;
                this.hacker.level++;
                for(var i = 0; i < ranks.length; i++){
                    if(ranks[i + 1] != undefined && this.hacker.achievmentRank == i && this.hacker.level >= ranks[i + 1].level){
                        this.hacker.achievmentRank++;
                        this.hacker.socket.emit('mainPackage', { unique: [{ task: 3001, rank: this.hacker.achievmentRank }] });
                    }
                }
                this.hacker.socket.emit('mainPackage', { unique: [
                    {
                        task: 2003,
                        text: `<br>Hacking successful. Reward: ${hackedAmount} BT<br><br> Select a new Port.`,
                        action: 0,
                        extra: {
                            overlay: {
                                value: hackedAmount
                            }
                        }
                    }]});
                this.hacker.update();
            }else{
                this.victim.hackers = this.victim.hackers.filter(handler => handler.hacker.id != this.hacker.id);
                this.victim.socket.emit('mainPackage', { unique: [{ task: 2005, data: { port: this.firewallID, hacked: false } }]});
            }
        }
    }

    /**
     * @param {String} message 
     */
    setHackingMessage(message){
        this.victim.comm.unshift(message);
        this.victim.update();
    }
}